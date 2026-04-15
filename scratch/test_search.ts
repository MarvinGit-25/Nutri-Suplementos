import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testSearch(query: string) {
    console.log(`Testing search for: "${query}"`);
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { category: { name: { contains: query, mode: 'insensitive' } } }
            ]
        },
        include: {
            category: true,
        }
    });

    console.log(`Found ${products.length} products.`);
    products.forEach(p => console.log(`- ${p.name}`));
}

const query = process.argv[2] || "";
testSearch(query)
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
