import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const dataId = searchParams.get("data.id");

        if (type === "payment" && dataId) {
            const payment = new Payment(client);
            const result = await payment.get({ id: dataId });

            if (result.status === "approved") {
                const orderId = result.external_reference;

                if (orderId) {
                    // Update order status
                    const order = await prisma.order.update({
                        where: { id: orderId },
                        data: { status: "PAID" },
                        include: { items: true }
                    });

                    // Decrement stock for each item
                    for (const item of order.items) {
                        await prisma.product.update({
                            where: { id: item.productId },
                            data: {
                                stock: {
                                    decrement: item.quantity
                                }
                            }
                        });
                    }

                    console.log(`[WEBHOOK] Order ${orderId} updated to PAID and stock decremented`);
                }
            }
        }

        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error("[WEBHOOK_ERROR]", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 200 });
    }
}
