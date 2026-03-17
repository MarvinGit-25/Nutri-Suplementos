"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Hydration fix for Zustand + Next.js
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={closeCart}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-dark-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-800">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-brand-500" />
                        Seu Carrinho
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <ShoppingBag className="w-16 h-16 mb-4 text-gray-300 dark:text-dark-700" />
                            <p className="text-lg font-medium mb-2">Seu carrinho está vazio</p>
                            <p className="text-sm">Que tal adicionar alguns suplementos?</p>
                            <button
                                onClick={closeCart}
                                className="mt-6 px-6 py-2 bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-500 rounded-full font-medium transition-colors"
                            >
                                Continuar Comprando
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.id} className="flex gap-4">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-800 flex-shrink-0">
                                        {item.imageUrl ? (
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                                                S/ Foto
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col flex-grow justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-semibold line-clamp-2 leading-tight pr-4">
                                                {item.name}
                                            </h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-gray-200 dark:border-dark-700 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-dark-800 text-gray-500 transition-colors rounded-l-lg"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-dark-800 text-gray-500 transition-colors rounded-r-lg"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <span className="font-bold text-brand-600 dark:text-brand-500">
                                                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 dark:border-dark-800 bg-gray-50 dark:bg-dark-950">
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="font-medium text-gray-600 dark:text-gray-400">Total</span>
                            <span className="font-black text-2xl">R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
                        </div>

                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25"
                        >
                            Finalizar Compra <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
