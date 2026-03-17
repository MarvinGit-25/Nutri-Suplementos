"use client";

import { ShoppingCart, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductDetailsProps {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        imageUrl: string | null;
        category: { name: string };
    };
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const { addItem } = useCartStore();

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-balance">{product.name}</h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                    ))}
                </div>
                <span className="text-sm text-gray-500">(48 avaliações)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
                <p className="text-sm text-gray-400 line-through">R$ {(product.price * 1.2).toFixed(2).replace(".", ",")}</p>
                <p className="text-5xl font-black text-brand-600 dark:text-brand-500">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    ou 12x de <span className="font-bold">R$ {(product.price / 12).toFixed(2).replace(".", ",")}</span> sem juros
                </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{product.description}</p>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                    onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl || "",
                        category: product.category.name
                    })}
                    className="flex-1 py-4 px-8 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Adicionar ao Carrinho
                </button>
                <button className="flex-1 py-4 px-8 bg-dark-900 hover:bg-dark-800 text-white rounded-xl font-bold text-lg transition-all border border-dark-700">
                    Comprar Agora
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-dark-800">
                <div className="flex flex-col items-center text-center gap-1">
                    <Truck className="w-6 h-6 text-brand-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Frete Grátis acima de R$ 200</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                    <Shield className="w-6 h-6 text-brand-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Compra 100% Segura</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                    <RotateCcw className="w-6 h-6 text-brand-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Troca em até 30 dias</span>
                </div>
            </div>
        </div>
    );
}
