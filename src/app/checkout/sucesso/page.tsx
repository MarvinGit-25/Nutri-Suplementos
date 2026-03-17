"use client";

import { CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutSucesso() {
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-dark-950">
            <div className="text-center max-w-lg bg-white dark:bg-dark-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-dark-800">
                <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>

                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                    Pagamento Recebido!
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed">
                    Sua transação foi concluída com sucesso. <br />
                    Em instantes você receberá um e-mail com a confirmação e os detalhes do envio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/pedidos"
                        className="flex-1 px-8 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Ver Meus Pedidos
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/25"
                    >
                        Voltar para a Loja
                    </Link>
                </div>

                <p className="mt-12 text-xs text-gray-400 font-medium">
                    Agradecemos pela confiança. Nutri Suplementos.
                </p>
            </div>
        </div>
    );
}
