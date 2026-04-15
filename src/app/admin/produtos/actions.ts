"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    return await prisma.product.findMany({
        where: { active: true },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getCategories() {
    return await prisma.category.findMany();
}

export async function deleteProduct(id: string) {
    await prisma.product.update({
        where: { id },
        data: { active: false }
    });
    revalidatePath("/admin/produtos");
    revalidatePath("/produtos");
    revalidatePath("/");
}

interface ProductInput {
    id?: string;
    name: string;
    categoryName: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
}

export async function upsertProduct(data: ProductInput) {
    const slug = data.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

    // Find or create category
    const category = await prisma.category.upsert({
        where: { name: data.categoryName },
        update: {},
        create: {
            name: data.categoryName,
            slug: data.categoryName.toLowerCase().replace(/\s+/g, "-"),
        },
    });

    const productData = {
        name: data.name,
        slug,
        price: data.price,
        stock: data.stock,
        description: data.description,
        imageUrl: data.imageUrl || null,
        categoryId: category.id,
    };

    if (data.id) {
        await prisma.product.update({
            where: { id: data.id },
            data: productData,
        });
    } else {
        await prisma.product.create({
            data: productData,
        });
    }

    revalidatePath("/admin/produtos");
    revalidatePath("/produtos");
    revalidatePath("/");
    revalidatePath(`/produto/${slug}`);
}
