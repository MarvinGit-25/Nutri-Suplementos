import { ShoppingCart, ArrowLeft, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
        },
    });

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-black mb-4">Produto não encontrado</h1>
                    <Link href="/produtos" className="text-brand-500 hover:underline">← Voltar para a loja</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
            <Link href="/produtos" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Voltar para a loja
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image */}
                <div className="relative aspect-square bg-gray-50 dark:bg-dark-800 rounded-3xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-dark-700">
                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="text-gray-300 dark:text-dark-600 text-center p-12">
                            <ShoppingCart className="w-24 h-24 mx-auto mb-4 opacity-20" />
                            <p className="text-sm">Imagem do Produto</p>
                        </div>
                    )}
                    <div className="absolute top-6 left-6">
                        <span className="bg-white dark:bg-dark-900 text-xs font-bold px-3 py-1.5 rounded-full text-brand-600 dark:text-brand-500 uppercase tracking-wide border border-gray-100 dark:border-dark-700">
                            {product.category.name}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-balance">{product.name}</h1>

                    {/* Stars */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">(48 avaliações)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <p className="text-sm text-gray-400 line-through">R$ {(product.price * 1.2).toFixed(2).replace(".", ",")}</p>
                        <p className="text-5xl font-black text-brand-600 dark:text-brand-500">
                            R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            ou 12x de <span className="font-bold">R$ {(product.price / 12).toFixed(2).replace(".", ",")}</span> sem juros
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{product.description}</p>

                    {/* Add to Cart - Client Component Wrapper */}
                    <AddToCartButton product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl || "",
                        category: product.category.name
                    }} />

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-dark-800">
                        <div className="flex flex-col items-center text-center gap-1">
                            <Truck className="w-6 h-6 text-brand-500" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Frete Grátis acima de R$ 200</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <Shield className="w-6 h-6 text-brand-500" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Compra 100% Segura</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <RotateCcw className="w-6 h-6 text-brand-500" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Troca em até 30 dias</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
