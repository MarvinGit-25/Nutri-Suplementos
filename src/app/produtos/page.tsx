import { ProductCard } from "@/components/ProductCard";
import { Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ProdutosPage({
    searchParams,
}: {
    searchParams: Promise<{ categoria?: string }>;
}) {
    const params = await searchParams;
    const selected = params.categoria ?? "Todos";

    // Fetch categories for the filter
    const categories = await prisma.category.findMany();
    const categoryNames = ["Todos", ...categories.map(c => c.name)];

    // Fetch products based on category
    const products = await prisma.product.findMany({
        where: selected === "Todos"
            ? {}
            : { category: { name: selected } },
        include: {
            category: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black">Todos os Produtos</h1>
                    <p className="text-gray-500 mt-1">{products.length} produtos encontrados</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Filter className="w-4 h-4" />
                    <span>Filtrar</span>
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-3 flex-wrap mb-10">
                {categoryNames.map(cat => (
                    <a
                        key={cat}
                        href={cat === "Todos" ? "/produtos" : `/produtos?categoria=${cat}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selected === cat
                            ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                            : "bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-700 hover:border-brand-300 hover:text-brand-600"
                            }`}
                    >
                        {cat}
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {products.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                </div>
            )}
        </div>
    );
}
