import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Fetch the category to confirm it exists and get its formal name
    const category = await prisma.category.findUnique({
        where: { slug },
    });

    if (!category) {
        notFound();
    }

    // Fetch products belonging to this category
    const products = await prisma.product.findMany({
        where: { 
            categoryId: category.id,
            active: true
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
            <div className="mb-10">
                <nav className="text-sm text-gray-500 mb-4 flex gap-2">
                    <Link href="/" className="hover:text-brand-500 transition-colors">Início</Link>
                    <span>/</span>
                    <a href="/produtos" className="hover:text-brand-500 transition-colors">Produtos</a>
                    <span>/</span>
                    <span className="text-brand-500 font-bold">{category.name}</span>
                </nav>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {category.name}
                </h1>
                <p className="text-gray-500 mt-2 max-w-2xl">
                    {category.description || `Confira nossa seleção exclusiva de ${category.name.toLowerCase()} para potencializar seus treinos.`}
                </p>
                <div className="mt-4 h-1 w-20 bg-brand-500 rounded-full"></div>
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
                    <p className="text-gray-500 text-lg font-medium">Ops! Nenhum produto encontrado nesta categoria no momento.</p>
                    <a href="/produtos" className="inline-block mt-6 px-8 py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors">
                        Ver Todos os Produtos
                    </a>
                </div>
            )}
        </div>
    );
}
