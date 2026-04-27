import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

function parseSignatureHeader(signatureHeader: string | null) {
    if (!signatureHeader) return null;

    const values = new Map<string, string>();
    for (const part of signatureHeader.split(",")) {
        const [rawKey, rawValue] = part.split("=");
        if (!rawKey || !rawValue) continue;
        values.set(rawKey.trim(), rawValue.trim());
    }

    const ts = values.get("ts");
    const v1 = values.get("v1");
    if (!ts || !v1) return null;

    return { ts, v1 };
}

function verifyMercadoPagoSignature(req: Request, notificationId: string) {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    const signatureHeader = req.headers.get("x-signature");
    const requestId = req.headers.get("x-request-id");

    if (!secret) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("MERCADOPAGO_WEBHOOK_SECRET is required in production");
        }
        console.warn("[WEBHOOK] Missing MERCADOPAGO_WEBHOOK_SECRET; signature validation skipped in non-production");
        return true;
    }

    const signature = parseSignatureHeader(signatureHeader);
    if (!signature || !requestId) {
        return false;
    }

    const manifest = `id:${notificationId};request-id:${requestId};ts:${signature.ts};`;
    const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

    const received = Buffer.from(signature.v1, "hex");
    const calculated = Buffer.from(expected, "hex");

    if (received.length !== calculated.length) {
        return false;
    }

    return crypto.timingSafeEqual(received, calculated);
}

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type") ?? searchParams.get("topic");
        const dataId = searchParams.get("data.id") ?? searchParams.get("id");

        if (type === "payment" && dataId) {
            if (!verifyMercadoPagoSignature(req, dataId)) {
                return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
            }

            const payment = new Payment(client);
            const result = await payment.get({ id: dataId });

            if (result.status === "approved") {
                const orderId = result.external_reference;

                if (orderId) {
                    await prisma.$transaction(async (tx) => {
                        const order = await tx.order.findUnique({
                            where: { id: orderId },
                            include: { items: true },
                        });

                        if (!order) {
                            console.warn(`[WEBHOOK] Order ${orderId} not found`);
                            return;
                        }

                        // Prevent duplicate stock decrements if provider retries notifications.
                        if (order.processed) {
                            console.log(`[WEBHOOK] Order ${orderId} already processed`);
                            return;
                        }

                        await tx.order.update({
                            where: { id: orderId },
                            data: { status: "PAID", processed: true },
                        });

                        for (const item of order.items) {
                            const updatedProduct = await tx.product.updateMany({
                                where: {
                                    id: item.productId,
                                    stock: { gte: item.quantity },
                                },
                                data: {
                                    stock: {
                                        decrement: item.quantity,
                                    },
                                },
                            });

                            if (updatedProduct.count === 0) {
                                throw new Error(`Failed to decrement stock for product ${item.productId}`);
                            }
                        }
                    });

                    console.log(`[WEBHOOK] Order ${orderId} updated to PAID and processed`);
                }
            }
        }

        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error("[WEBHOOK_ERROR]", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
