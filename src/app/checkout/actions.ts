"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface OrderInput {
    name: string;
    email: string;
    cpf: string;
    cep: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    state: string;
    payment: string;
    items: {
        id: string;
        quantity: number;
        price: number;
    }[];
}

export async function createOrder(data: OrderInput) {
    // 0. Group items by ID to prevent duplicates
    const groupedItemsMap = data.items.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].quantity += item.quantity;
        } else {
            acc[item.id] = { ...item };
        }
        return acc;
    }, {} as Record<string, { id: string; quantity: number; price: number }>);

    const groupedItems = Object.values(groupedItemsMap);

    const total = groupedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 1. Upsert User (identified by email)
    const user = await prisma.user.upsert({
        where: { email: data.email },
        update: { name: data.name },
        create: {
            email: data.email,
            name: data.name,
            role: "USER",
        },
    });

    // 2. Create Order
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            total,
            status: "PENDING",
            cpf: data.cpf,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            paymentMethod: data.payment,
            items: {
                create: groupedItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {
            items: true,
        },
    });

    revalidatePath("/admin/pedidos");
    revalidatePath("/admin");

    return { id: order.id, total: order.total };
}
