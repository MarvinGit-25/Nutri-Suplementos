"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    const settings = await prisma.setting.findMany();
    const config: Record<string, string> = {
        storeName: "XNUTRI",
        contactEmail: "contato@xnutri.com.br",
        contactPhone: "(11) 99999-9999",
        deliveryFee: "15.00"
    };
    settings.forEach(s => config[s.key] = s.value);
    return config;
}

export async function updateSettings(data: Record<string, string>) {
    for (const [key, value] of Object.entries(data)) {
        await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });
    }
    revalidatePath("/");
    revalidatePath("/admin/configuracoes");
}
