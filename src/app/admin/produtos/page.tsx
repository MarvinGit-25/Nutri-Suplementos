import { prisma } from "@/lib/prisma";
import { ProductsTable } from "./ProductsTable";

export const dynamic = 'force-dynamic';

export default async function AdminProdutos() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const categories = await prisma.category.findMany();

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Produtos</h1>
                    <p className="text-gray-500 mt-1">{products.length} produtos cadastrados</p>
                </div>
                <ProductsTable products={JSON.parse(JSON.stringify(products))} categories={JSON.parse(JSON.stringify(categories))} isCreateOnly={true} />
            </div>

            <ProductsTable
                products={JSON.parse(JSON.stringify(products))}
                categories={JSON.parse(JSON.stringify(categories))}
            />
        </div>
    );
}
