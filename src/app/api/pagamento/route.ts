import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const { items, payer, orderId } = await req.json();

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items.map((item: { name: string; price: number; quantity: number }) => ({
                    id: item.name,
                    title: item.name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    currency_id: "BRL",
                })),
                payer: {
                    name: payer?.name,
                    email: payer?.email,
                },
                back_urls: {
                    success: `${process.env.NEXTAUTH_URL}/checkout/sucesso`,
                    failure: `${process.env.NEXTAUTH_URL}/checkout/falha`,
                    pending: `${process.env.NEXTAUTH_URL}/checkout/pendente`,
                },
                auto_return: "approved",
                external_reference: orderId,
                statement_descriptor: "NUTRISUP",
            },
        });

        return NextResponse.json({
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
            id: result.id,
        });
    } catch (error) {
        console.error("[MERCADOPAGO_ERROR]", error);
        return NextResponse.json({ error: "Erro ao criar preferência de pagamento." }, { status: 500 });
    }
}
