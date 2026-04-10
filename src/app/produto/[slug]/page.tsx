import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { ProductDetails } from "@/components/ProductDetails";
import Image from "next/image";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a loja
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-50 dark:bg-dark-800 rounded-3xl overflow-hidden flex items-center justify-center border border-gray-100 dark:border-dark-700 group">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-300 dark:text-dark-600 text-center p-12">
              <ShoppingCart className="w-24 h-24 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Sem imagem disponível</p>
            </div>
          )}
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-brand-600 dark:text-brand-500 uppercase tracking-wide border border-gray-100 dark:border-dark-700 shadow-sm">
              {product.category.name}
            </span>
          </div>
        </div>

        {/* Product details (client component for interactivity) */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
