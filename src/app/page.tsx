import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Target, ShieldPlus } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch featured products from Prisma
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dark-900 text-white overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-br from-brand-900/40 via-dark-900 to-dark-900 opacity-80" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-balance">
              POTENCIALIZE SEUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">RESULTADOS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl text-balance">
              Suplementos premium com fórmulas clinicamente comprovadas. A energia e recuperação que seu corpo não sabia que precisava.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/produtos" className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 w-full sm:w-auto text-center">
                Comprar Agora
              </Link>
              <Link href="/produtos" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-lg transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                Ver Lançamentos <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 mt-8">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl font-black text-white">10k+</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Clientes Ativos</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl font-black text-white">50+</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Produtos Exclusivos</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl font-black text-brand-500">4.9/5</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Avaliação Média</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 mt-16 md:mt-0 relative hidden md:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-full blur-[80px] opacity-30 animate-pulse" />
              <div className="absolute inset-8 bg-dark-800 rounded-3xl border border-white/10 shadow-2xl overflow-hidden glass group">
                <Image
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200"
                  alt="Suplementos Premium"
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-dark-950 border-y border-gray-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Máxima Absorção</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fórmulas otimizadas para garantir que seu corpo aproveite 100% dos nutrientes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500 flex items-center justify-center flex-shrink-0">
                <ShieldPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Qualidade Premium</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Matéria-prima importada e laudos de pureza disponíveis em todos os lotes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Foco no Objetivo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Produtos específicos para emagrecimento, hipertrofia ou resistência energética.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">OS MAIS VENDIDOS</h2>
              <p className="text-gray-500 dark:text-gray-400">A elite da suplementação escolhida pelos nossos atletas.</p>
            </div>
            <Link href="/produtos" className="hidden md:flex items-center gap-2 font-bold text-brand-600 dark:text-brand-500 hover:opacity-80 transition-opacity">
              Ver Todos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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

          <div className="mt-12 md:hidden">
            <Link href="/produtos" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-dark-800 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors border border-gray-200 dark:border-dark-700">
              Ver Todos os Produtos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
