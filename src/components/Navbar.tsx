"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, User, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Suggestion {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
    category: {
        name: string;
    };
}

export function Navbar() {
    const { openCart, getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Search & Autocomplete State
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced Search Logic
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const res = await fetch(`/api/busca/sugestoes?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Fetch suggestions error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const categories = [
        { name: "Proteínas", href: "/categorias/proteinas" },
        { name: "Creatina", href: "/categorias/creatina" },
        { name: "Pré-Treino", href: "/categorias/pre-treino" },
        { name: "Vitaminas", href: "/categorias/vitaminas" },
    ];

    const SuggestionsDropdown = ({ items }: { items: Suggestion[] }) => (
        <div className="absolute top-full left-0 right-0 bg-black border border-white/10 shadow-2xl z-[100] mt-1 space-y-1 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {items.length > 0 ? (
                items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/produto/${item.slug}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-4 p-2 hover:bg-dark-700 transition-colors group"
                    >
                        <div className="relative w-12 h-12 bg-dark-800 p-1 flex-shrink-0">
                            {item.imageUrl ? (
                                <Image src={item.imageUrl} alt={item.name} fill sizes="48px" className="object-contain" />
                            ) : (
                                <div className="w-full h-full bg-dark-900" />
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="text-[10px] font-black text-white uppercase truncate group-hover:text-brand-500 transition-colors">
                                {item.name}
                            </p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                                {item.category.name}
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-[10px] font-black text-brand-500 italic">
                                R$ {item.price.toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="p-4 text-center">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">Nenhum produto encontrado</p>
                </div>
            )}
            <Link 
                href={`/busca?q=${query}`}
                onClick={() => setShowSuggestions(false)}
                className="block p-3 bg-dark-800 hover:bg-brand-500 text-white text-[9px] font-black uppercase text-center tracking-[0.3em] transition-all"
            >
                Ver todos os resultados
            </Link>
        </div>
    );

    return (
        <header className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
            {/* Top Promo Bar */}
            <div className="bg-brand-500 text-white py-1.5 px-4 text-center">
                <p className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase">
                    FRETE GRÁTIS ACIMA DE R$ 199 • PARCELE EM ATÉ 12X SEM JUROS
                </p>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center group">
                            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase group-hover:text-brand-500 transition-colors flex items-baseline gap-1">
                                X<span className="text-brand-500 group-hover:text-white transition-colors">NUTRI</span>
                                <span className="text-[10px] sm:text-[12px] tracking-[0.3em] font-black text-gray-500 group-hover:text-white transition-colors ml-1">SUPLEMENTOS</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        {categories.map(cat => (
                            <Link key={cat.href} href={cat.href} className="text-[11px] font-black uppercase tracking-widest text-gray-300 hover:text-brand-500 transition-colors">
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <div ref={searchRef} className="relative hidden md:block group">
                            <form action="/busca" method="GET" onSubmit={() => setShowSuggestions(false)}>
                                <input
                                    name="q"
                                    type="text"
                                    autoComplete="off"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    placeholder="O QUE VOCÊ BUSCA?"
                                    className="pl-4 pr-10 py-2 bg-dark-700 border border-white/10 rounded-none text-[10px] font-bold focus:border-brand-500 focus:ring-0 outline-none w-48 lg:w-64 transition-all text-white placeholder:text-gray-500 uppercase tracking-wider"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-brand-500 transition-colors">
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-brand-500" /> : <Search className="w-4 h-4" />}
                                </button>
                            </form>

                            {/* Dropdown Desktop */}
                            {showSuggestions && query.length >= 2 && (
                                <SuggestionsDropdown items={suggestions} />
                            )}
                        </div>
                        
                        <div className="flex items-center border-l border-white/10 pl-2 sm:pl-5 space-x-1 sm:space-x-3">
                            <Link href="/conta" className="p-2 text-white hover:text-brand-500 transition-colors hidden sm:block">
                                <User className="w-5 h-5" />
                            </Link>
                            
                            <button onClick={openCart} className="relative p-2 text-white hover:text-brand-500 transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                {mounted && getTotalItems() > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-black leading-none text-white bg-brand-500 rounded-full">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>
                            
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white hover:text-brand-500 transition-colors lg:hidden">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-black border-t border-white/10 p-6 space-y-6 animate-in slide-in-from-top duration-300">
                    <div className="relative">
                        <form action="/busca" method="GET" onSubmit={() => {
                            setShowSuggestions(false);
                            setIsMenuOpen(false);
                        }}>
                            <input
                                name="q"
                                type="text"
                                autoComplete="off"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="BUSCAR PRODUTOS..."
                                className="w-full pl-4 pr-10 py-4 bg-dark-700 border border-white/10 rounded-none text-xs font-bold text-white outline-none focus:border-brand-500 uppercase"
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-brand-500" /> : <Search className="w-5 h-5 text-gray-400" />}
                            </button>
                        </form>

                        {/* Dropdown Mobile */}
                        {query.length >= 2 && suggestions.length > 0 && (
                            <SuggestionsDropdown items={suggestions} />
                        )}
                    </div>

                    <nav className="flex flex-col gap-4">
                        {categories.map(cat => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-black uppercase tracking-widest text-white hover:text-brand-500 transition-colors py-2"
                            >
                                {cat.name}
                            </Link>
                        ))}
                        <Link
                            href="/conta"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-black uppercase tracking-widest text-white hover:text-brand-500 flex items-center gap-3 py-2 border-t border-white/5 mt-2"
                        >
                            <User className="w-5 h-5" />
                            Minha Conta
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
