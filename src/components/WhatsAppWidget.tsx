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
            className="fixed bottom-8 right-8 z-50 p-4 bg-white hover:bg-brand-500 text-black hover:text-white transition-all duration-300 hover:-translate-y-1 group flex items-center justify-center border border-black/10 shadow-[8px_8px_0px_rgba(211,47,47,0.3)] hover:shadow-none"
            aria-label="Fale conosco no WhatsApp"
        >
            <MessageCircle className="w-6 h-6 relative z-10" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-black border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap italic">
                SUPORTE XNUTRI
            </span>
        </a>
    );
}
