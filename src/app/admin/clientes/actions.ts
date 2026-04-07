"use server";

import { prisma } from "@/lib/prisma";

export async function getClients() {
    const users = await prisma.user.findMany({
        where: { role: "USER" },
        include: {
            orders: { select: { total: true } }
        },
        orderBy: { createdAt: "desc" }
    });
    
    return users.map(user => ({
        id: user.id,
        name: user.name || "Sem Nome",
        email: user.email,
        createdAt: user.createdAt,
        totalOrders: user.orders.length,
        totalSpent: user.orders.reduce((acc, order) => acc + order.total, 0)
    }));
}
