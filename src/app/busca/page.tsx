import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q?.trim() || "";

    const products = await prisma.product.findMany({
        where: {
            active: true,
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { category: { name: { contains: query, mode: 'insensitive' } } }
            ]
        },
        include: {
            category: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    return (
        <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header da Busca */}
                <div className="mb-16 text-center lg:text-left border-b border-white/5 pb-10">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-dark-800 border border-white/10 mb-6">
                        <Search className="w-4 h-4 text-brand-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">BUSCA DE PRODUTOS</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-[900] text-white uppercase italic tracking-tighter mb-4">
                        RESULTADOS PARA: <span className="text-brand-500">&quot;{query}&quot;</span>
                    </h1>
                    
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        {products.length === 0
                            ? "NENHUM RESULTADO ENCONTRADO"
                            : `ENCONTRAMOS ${products.length} PRODUTO(S) PARA SUA PESQUISA`}
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                slug={product.slug}
                                name={product.name}
                                price={product.price}
                                category={product.category.name}
                                imageUrl={product.imageUrl || ""}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-dark-900 border border-white/5">
                        <div className="max-w-md mx-auto px-4">
                             <div className="w-16 h-16 bg-white/5 flex items-center justify-center mx-auto mb-8 -skew-x-12">
                                <Search className="w-8 h-8 text-gray-700 skew-x-12" />
                            </div>
                            <h2 className="text-xl font-black text-white uppercase italic tracking-widest mb-4">SEM RESULTADOS</h2>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 leading-loose mb-10">
                                NÃO ENCONTRAMOS NADA COM ESSE TERMO. TENTE PALAVRAS MAIS GENÉRICAS OU NAVEGUE PELAS CATEGORIAS.
                            </p>
                            <a href="/produtos" className="inline-block px-10 py-5 bg-white hover:bg-brand-500 text-black hover:text-white font-[900] text-xs tracking-[0.2em] uppercase transition-all">
                                VER TODOS OS PRODUTOS
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
