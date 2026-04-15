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

  if (!product || !product.active) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          VOLTAR PARA A LOJA
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Section - Industrial Stage */}
          <div className="relative aspect-square bg-[#111111] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center group shadow-2xl">
            {/* Subtle stage lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
            
            {product.imageUrl ? (
              <div className="relative w-full h-full p-12">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ) : (
              <div className="text-gray-700 text-center p-12">
                <ShoppingCart className="w-24 h-24 mx-auto mb-4 opacity-10" />
                <p className="text-[10px] font-black uppercase tracking-widest">Aguardando Imagem Brutal</p>
              </div>
            )}
            
            <div className="absolute top-8 left-8">
              <span className="bg-brand-500 text-white text-[10px] font-[900] px-4 py-2 uppercase tracking-[0.2em] italic">
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
