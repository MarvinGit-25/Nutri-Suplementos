"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });

        revalidatePath("/admin/pedidos");
        return { success: true };
    } catch (error) {
        console.error("[UPDATE_ORDER_STATUS_ERROR]", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Erro desconhecido" 
        };
    }
}
