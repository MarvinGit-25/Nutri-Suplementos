"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        category: string;
    };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCartStore();

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
                onClick={() => addItem(product)}
                className="flex-1 py-4 px-8 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25"
            >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
            </button>
            <button className="flex-1 py-4 px-8 bg-dark-900 dark:bg-white dark:text-dark-900 hover:bg-dark-800 text-white rounded-xl font-bold text-lg transition-all border border-dark-700">
                Comprar Agora
            </button>
        </div>
    );
}
