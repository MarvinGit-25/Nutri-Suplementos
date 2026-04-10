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
            OR: [
                { name: { contains: query } },
                { description: { contains: query } },
                { category: { name: { contains: query } } }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Search className="w-8 h-8 text-brand-500" />
                    Resultados para &quot;{query}&quot;
                </h1>
                <p className="text-gray-500 mt-2">
                    {products.length === 0
                        ? "Não encontramos nada para sua busca. Tente palavras-chave diferentes."
                        : `Encontramos ${products.length} produto(s) que combinam com sua pesquisa.`}
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="py-24 text-center bg-gray-50 dark:bg-dark-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-dark-800">
                    <p className="text-gray-500 text-lg">Que tal tentar um termo menos específico?</p>
                    <a href="/produtos" className="inline-block mt-6 px-8 py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors">
                        Ver Todos os Produtos
                    </a>
                </div>
            )}
        </div>
    );
}
