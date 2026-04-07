import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "./ProductFilters";
import { prisma } from "@/lib/prisma";

export default async function ProdutosPage({
    searchParams,
}: {
    searchParams: Promise<{ categoria?: string, sort?: string, maxPrice?: string }>;
}) {
    const params = await searchParams;
    const selected = params.categoria || "Todos";
    const sortParams = params.sort || "populares";
    const maxPrice = Number(params.maxPrice) || 500;

    // Fetch categories for the filter
    const categories = await prisma.category.findMany();
    const categoryNames = ["Todos", ...categories.map(c => c.name)];

    // Apply Sort condition
    let orderRule: any = { createdAt: "desc" };
    if (sortParams === "menor-preco") orderRule = { price: "asc" };
    else if (sortParams === "maior-preco") orderRule = { price: "desc" };
    else if (sortParams === "nome-a-z") orderRule = { name: "asc" };

    // Apply Filter condition
    let whereRule: any = { price: { lte: maxPrice } };
    if (selected !== "Todos") {
        whereRule.category = { name: selected };
    }

    // Fetch products
    const products = await prisma.product.findMany({
        where: whereRule,
        include: {
            category: true,
        },
        orderBy: orderRule,
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black">Todos os Produtos</h1>
                    <p className="text-gray-500 mt-1">{products.length} produtos encontrados</p>
                </div>
            </div>
            <ProductFilters 
                selected={selected} 
                sortParams={sortParams} 
                maxPrice={maxPrice} 
                categoryNames={categoryNames} 
            />

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
