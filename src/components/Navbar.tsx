"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export function Navbar() {
    const { openCart, getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const categories = [
        { name: "Proteínas", href: "/categorias/proteinas" },
        { name: "Creatina", href: "/categorias/creatina" },
        { name: "Pré-Treino", href: "/categorias/pre-treino" },
        { name: "Vitaminas", href: "/categorias/vitaminas" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass">
            {/* Gradient Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#FFD700] via-[#ff8c00] to-[#FF007F]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="text-xl sm:text-2xl font-black tracking-tighter text-brand-500 uppercase">XNUTRI</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {categories.map(cat => (
                            <Link key={cat.href} href={cat.href} className="text-sm font-medium hover:text-brand-500 transition-colors">
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <form action="/busca" method="GET" className="relative hidden lg:block">
                            <input
                                name="q"
                                type="text"
                                placeholder="Buscar..."
                                className="pl-4 pr-10 py-1.5 bg-gray-100 dark:bg-dark-800 border-none rounded-full text-xs focus:ring-1 focus:ring-brand-500 outline-none w-40 focus:w-60 transition-all"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-900 dark:text-white hover:text-brand-500 transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>
                        <Link href="/conta" className="p-2 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors hidden md:block">
                            <User className="w-5 h-5" />
                        </Link>
                        <button onClick={openCart} className="relative p-2 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {mounted && getTotalItems() > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-500 rounded-full">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors md:hidden">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-800 p-4 space-y-4 animate-in slide-in-from-top duration-300">
                    <form action="/busca" method="GET" className="relative">
                        <input
                            name="q"
                            type="text"
                            placeholder="Buscar produtos..."
                            className="w-full pl-4 pr-10 py-3 bg-gray-100 dark:bg-dark-800 border-none rounded-xl text-sm focus:ring-1 focus:ring-brand-500 outline-none"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </form>
                    <nav className="flex flex-col gap-2">
                        {categories.map(cat => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-xl text-sm font-bold transition-all"
                            >
                                {cat.name}
                            </Link>
                        ))}
                        <Link
                            href="/conta"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            <User className="w-4 h-4" />
                            Minha Conta
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
