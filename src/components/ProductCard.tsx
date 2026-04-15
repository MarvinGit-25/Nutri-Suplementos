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
        <div className="group flex flex-col bg-dark-800 border border-white/5 hover:border-brand-500/50 transition-all duration-300 relative">
            {/* Discount Badge */}
            <div className="absolute top-0 left-0 z-10 bg-promo-500 text-black px-3 py-1 font-black text-[10px] uppercase tracking-tighter">
                20% OFF
            </div>

            <Link href={`/produto/${slug}`} className="relative p-6 bg-black group-hover:bg-dark-900 transition-colors duration-500">
                <div className="relative aspect-square w-full bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5 shadow-inner">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-[10px] uppercase tracking-widest px-4 text-center">
                            Aguardando Imagem Brutal
                        </div>
                    )}
                    
                    {/* DarkLab Style Gradient overlay on top of the grey box */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                </div>
                
                {/* Category Badge - Repositioned */}
                <div className="absolute top-4 right-8">
                    <span className="text-[8px] font-black text-gray-400 bg-black/50 backdrop-blur-sm px-2 py-1 uppercase tracking-[0.2em] border border-white/5 italic">
                        {category}
                    </span>
                </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/produto/${slug}`} className="block flex-grow min-h-[48px]">
                    <h3 className="font-bold text-sm text-white leading-tight uppercase tracking-tight group-hover:text-brand-500 transition-colors line-clamp-2">
                        {name}
                    </h3>
                </Link>

                <div className="mt-4 space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-500 line-through">
                            R$ {(price * 1.25).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[10px] font-bold text-promo-500 bg-promo-500/10 px-1.5 py-0.5">
                            ECONOMIA DE R$ {(price * 0.25).toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                    
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-white leading-none">
                            R$ {price.toFixed(2).replace('.', ',')}
                        </span>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">
                            OU R$ {(price * 0.95).toFixed(2).replace('.', ',')} NO <span className="text-brand-500 font-bold">PIX</span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="mt-5 w-full bg-white hover:bg-brand-500 text-black hover:text-white py-3.5 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                    <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                    COMPRAR
                </button>
            </div>
        </div>
    );
}
