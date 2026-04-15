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
        <div className="flex flex-col space-y-10">
            <div>
                <h1 className="text-4xl md:text-6xl font-[900] tracking-tighter uppercase italic leading-[0.9] text-white">
                    {product.name}
                </h1>
                
                {/* Stars & Category */}
                <div className="flex items-center gap-6 mt-6">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-brand-500 text-brand-500" : "fill-gray-800 text-gray-800"}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic pt-1">
                        (48 AVALIAÇÕES BRUTAIS)
                    </span>
                </div>
            </div>

            {/* Price Stage */}
            <div className="bg-dark-900 border border-white/5 p-8 -skew-x-2">
                <p className="text-xs text-gray-500 line-through uppercase tracking-widest mb-1 italic">DE: R$ {(product.price * 1.2).toFixed(2).replace(".", ",")}</p>
                <div className="flex items-baseline gap-4">
                    <p className="text-6xl font-[900] text-white italic tracking-tighter">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                    </p>
                    <span className="bg-promo-500 text-black text-[10px] font-black px-2 py-1 uppercase tracking-tighter -rotate-2">
                        SAVE 25%
                    </span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-[0.2em]">
                    OU EM ATÉ 12X DE <span className="text-white">R$ {(product.price / 12).toFixed(2).replace(".", ",")}</span> SEM JUROS
                </p>
                <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs font-black text-brand-500 uppercase italic tracking-widest">
                        PAGUE COM PIX E GANHE +5% DE DESCONTO
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-4 border-brand-500 pl-4">Descrição de Performance</h3>
                <p className="text-sm font-bold text-gray-500 leading-relaxed uppercase tracking-tight">{product.description}</p>
            </div>

            {/* Add to Cart - Aggressive Buttons */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl || "",
                        category: product.category.name
                    })}
                    className="w-full py-6 bg-brand-500 hover:bg-brand-600 text-white font-[900] text-sm tracking-[0.3em] uppercase transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-2xl shadow-brand-500/20 italic"
                >
                    <ShoppingCart className="w-5 h-5" />
                    ADICIONAR AO CARRINHO
                </button>
                <button className="w-full py-6 bg-white hover:bg-gray-100 text-black font-[900] text-sm tracking-[0.3em] uppercase transition-all flex items-center justify-center italic">
                    COMPRAR AGORA
                </button>
            </div>

            {/* Trust Badges - Industrial Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-dark-800 border border-white/5 flex items-center justify-center -skew-x-12 group-hover:bg-brand-500 transition-colors">
                        <Truck className="w-5 h-5 text-gray-400 group-hover:text-white skew-x-12" />
                    </div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">FRETE GRÁTIS<br/>ACIMA R$ 200</span>
                </div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-dark-800 border border-white/5 flex items-center justify-center -skew-x-12 group-hover:bg-brand-500 transition-colors">
                        <Shield className="w-5 h-5 text-gray-400 group-hover:text-white skew-x-12" />
                    </div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">COMPRA 100%<br/>SEGURA</span>
                </div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-dark-800 border border-white/5 flex items-center justify-center -skew-x-12 group-hover:bg-brand-500 transition-colors">
                        <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-white skew-x-12" />
                    </div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">TROCA EM ATÉ<br/>30 DIAS</span>
                </div>
            </div>
        </div>
    );
}
