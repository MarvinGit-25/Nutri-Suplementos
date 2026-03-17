"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductProps {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export function ProductCard({ id, slug, name, price, imageUrl, category }: ProductProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, price, imageUrl, category });
    };

    return (
        <div className="group flex flex-col bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-700 hover:shadow-xl transition-all duration-300">
            <Link href={`/produto/${slug}`} className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-dark-900">
                {/* Placeholder if no image */}
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Sem Imagem
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-brand-600 dark:text-brand-500 uppercase tracking-wide">
                        {category}
                    </span>
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <Link href={`/produto/${slug}`} className="block flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight mb-2 group-hover:text-brand-500 transition-colors line-clamp-2">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 line-through block">
                            R$ {(price * 1.2).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xl font-black text-brand-600 dark:text-brand-500">
                            R$ {price.toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-500 text-brand-600 hover:text-white dark:bg-brand-900/30 dark:hover:bg-brand-500 dark:text-brand-500 dark:hover:text-white flex items-center justify-center transition-all duration-300 transform active:scale-95"
                        aria-label="Adicionar ao carrinho"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
