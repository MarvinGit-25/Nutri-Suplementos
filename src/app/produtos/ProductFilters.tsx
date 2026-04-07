"use client";
import { Filter } from "lucide-react";

export function ProductFilters({ 
    selected, 
    sortParams, 
    maxPrice, 
    categoryNames 
}: { 
    selected: string, 
    sortParams: string, 
    maxPrice: number, 
    categoryNames: string[] 
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-dark-900 border border-dark-800 p-4 rounded-2xl">
            {/* Categories Desktop */}
            <div className="hidden md:flex gap-2 flex-wrap">
                {categoryNames.map(cat => (
                    <a
                        key={cat}
                        href={`/produtos?categoria=${cat}&sort=${sortParams}&maxPrice=${maxPrice}`}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selected === cat
                            ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                            : "bg-dark-800 text-gray-400 border border-dark-700 hover:border-brand-500 hover:text-brand-500"
                            }`}
                    >
                        {cat}
                    </a>
                ))}
            </div>

            {/* Mobile Category Dropdown */}
            <div className="md:hidden w-full">
                <select 
                    className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white outline-none"
                    title="Categoria"
                    value={selected}
                    onChange={(e) => {
                        window.location.href = `/produtos?categoria=${e.target.value}&sort=${sortParams}&maxPrice=${maxPrice}`;
                    }}
                >
                    {categoryNames.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Filters Tools */}
            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Sort Dropdown */}
                <div className="flex-grow">
                    <select 
                        className="w-full md:w-48 bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-500 text-sm"
                        value={sortParams}
                        title="Ordenar por"
                        onChange={(e) => {
                            window.location.href = `/produtos?categoria=${selected}&maxPrice=${maxPrice}&sort=${e.target.value}`;
                        }}
                    >
                        <option value="populares">Lançamentos</option>
                        <option value="menor-preco">Menor Preço</option>
                        <option value="maior-preco">Maior Preço</option>
                        <option value="nome-a-z">Ordem Alfabética</option>
                    </select>
                </div>

                <div className="flex-grow md:w-32">
                    <select 
                        className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-500 text-sm"
                        value={maxPrice}
                        title="Filtro de Preço"
                        onChange={(e) => {
                            window.location.href = `/produtos?categoria=${selected}&sort=${sortParams}&maxPrice=${e.target.value}`;
                        }}
                    >
                        <option value="9999">Qualquer Preço</option>
                        <option value="100">Até R$ 100</option>
                        <option value="250">Até R$ 250</option>
                        <option value="500">Até R$ 500</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
