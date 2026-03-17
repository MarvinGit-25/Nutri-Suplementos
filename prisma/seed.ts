import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Cleanup existing data
    console.log("Cleaning up database...");
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    console.log("Cleanup finished.");
    await prisma.user.upsert({
        where: { email: "admin@nutrisup.com" },
        update: { role: "ADMIN" },
        create: {
            email: "admin@nutrisup.com",
            name: "Admin NutriSup",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    // Categories
    const proteina = await prisma.category.upsert({
        where: { name: "Proteína" },
        update: { slug: "proteinas" },
        create: { name: "Proteína", slug: "proteinas" },
    });

    const creatina = await prisma.category.upsert({
        where: { name: "Creatina" },
        update: { slug: "creatina" },
        create: { name: "Creatina", slug: "creatina" },
    });

    const preTreino = await prisma.category.upsert({
        where: { name: "Pré-treino" },
        update: {},
        create: { name: "Pré-treino", slug: "pre-treino" },
    });

    const vitaminas = await prisma.category.upsert({
        where: { name: "Vitaminas" },
        update: {},
        create: { name: "Vitaminas", slug: "vitaminas" },
    });

    // Products
    const products = [
        {
            name: "100% Whey Prime (900g)",
            slug: "100-whey-prime-900g",
            price: 129.9,
            description: "O Whey Prime é feito com as melhores fontes de proteína, ideal para ganho de massa muscular e recuperação pós-treino.",
            categoryId: proteina.id,
            stock: 50,
            imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
        },
        {
            name: "Creatina Monohidratada Pura (300g)",
            slug: "creatina-monohidratada-pura-300g",
            price: 89.9,
            description: "Creatina de grau farmacêutico, 100% pura, para aumento de força e explosão muscular.",
            categoryId: creatina.id,
            stock: 120,
            imageUrl: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800",
        },
        {
            name: "Pré-Treino Insano Nuclear (300g)",
            slug: "pre-treino-insano-nuclear-300g",
            price: 149.9,
            description: "A fórmula mais completa para máxima performance, foco e energia durante seus treinos mais intensos.",
            categoryId: preTreino.id,
            stock: 30,
            imageUrl: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800",
        },
        {
            name: "Multivitamínico Performance (120 caps)",
            slug: "multivitaminico-performance-120-caps",
            price: 59.9,
            description: "Complexo vitamínico completo para atletas, garantindo todos os micronutrientes necessários para o dia a dia.",
            categoryId: vitaminas.id,
            stock: 200,
            imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800",
        },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: { categoryId: p.categoryId, price: p.price, stock: p.stock },
            create: p,
        });
    }

    console.log("Seed data applied successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
