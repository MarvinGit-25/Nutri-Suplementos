import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
        return NextResponse.json([]);
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                active: true,
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { category: { name: { contains: query, mode: "insensitive" } } },
                ],
            },
            take: 6,
            select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                imageUrl: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Autocomplete error:", error);
        return NextResponse.json({ error: "Erro ao buscar sugestões" }, { status: 500 });
    }
}
