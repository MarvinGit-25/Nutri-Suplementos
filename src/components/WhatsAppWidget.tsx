import { MessageCircle } from "lucide-react";

export async function WhatsAppWidget() {
    let phone = "5511999999999";

    try {
        const { prisma } = await import("@/lib/prisma");
        const setting = await prisma.setting.findUnique({ where: { key: "contactPhone" } });
        if (setting?.value) {
            phone = setting.value;
        }
    } catch {
        // If DB is unavailable (e.g. during build), use the default phone
    }

    // Clean string keeping only numbers
    const cleanPhone = phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.length > 8 ? cleanPhone : "5511999999999";

    return (
        <a
            href={`https://wa.me/${finalPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/30 transition-all hover:-translate-y-1 group flex items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-700"
            aria-label="Fale conosco no WhatsApp"
        >
            <MessageCircle className="w-8 h-8 relative z-10" />
            
            {/* Tooltip */}
            <span className="absolute -top-12 right-0 bg-dark-900 border border-dark-800 text-white text-sm font-bold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                Precisa de ajuda?
            </span>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 duration-1000"></div>
        </a>
    );
}
