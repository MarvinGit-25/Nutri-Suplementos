import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Target, ShieldPlus } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured products from Prisma
  const featuredProducts = await prisma.product.findMany({
    where: { active: true },
    take: 4,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/5">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=2000"
            alt="Academia Bruta"
            fill
            priority
            className="object-cover opacity-40 grayscale"
          />
          {/* Gradients for readability and DarkLab style */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                <Zap className="w-3 h-3" /> NOVIDADE: BLACK LINE SERIES
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[110px] font-[900] tracking-tighter leading-[0.85] uppercase italic">
                EXPLODA SEUS <br />
                <span className="text-transparent stroke-text text-white">LIMITES</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-xl font-medium uppercase tracking-tight leading-relaxed">
                Suplementação de elite para quem não aceita menos que o topo. <br className="hidden md:block" />
                Fórmulas brutas, resultados reais.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link href="/produtos" className="px-12 py-6 bg-white hover:bg-brand-500 text-black hover:text-white font-[900] text-sm tracking-[0.2em] uppercase transition-all transform hover:scale-105 w-full sm:w-auto text-center border-b-4 border-gray-300 hover:border-brand-900 shadow-2xl">
                  Comprar Agora
                </Link>
                <Link href="/produtos" className="px-12 py-6 bg-transparent border border-white/20 hover:border-brand-500 text-white font-[900] text-sm tracking-[0.2em] uppercase transition-all w-full sm:w-auto text-center flex items-center justify-center gap-3 group">
                  Lançamentos <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 opacity-70">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white italic">+100K</span>
                  <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Atletas</span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-8">
                  <span className="text-2xl font-black text-white italic">100%</span>
                  <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Puro</span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-8 hidden md:flex">
                  <span className="text-2xl font-black text-brand-500 italic">PREMIUM</span>
                  <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Qualidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Benefits Section */}
      <section className="py-20 bg-dark-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white text-black flex items-center justify-center -skew-x-12">
                <Zap className="w-8 h-8 skew-x-12" />
              </div>
              <h3 className="font-black text-lg uppercase tracking-widest italic">Absorção Flash</h3>
              <p className="text-xs text-gray-500 uppercase tracking-tight leading-relaxed">Tecnologia avançada para entrega imediata de nutrientes.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 border-x border-white/5 px-12 lg:px-24">
              <div className="w-16 h-16 bg-brand-500 text-white flex items-center justify-center -skew-x-12">
                <ShieldPlus className="w-8 h-8 skew-x-12" />
              </div>
              <h3 className="font-black text-lg uppercase tracking-widest italic">Pureza Brutal</h3>
              <p className="text-xs text-gray-500 uppercase tracking-tight leading-relaxed">Sem fillers, sem frescura. Apenas o que seu músculo precisa.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white text-black flex items-center justify-center -skew-x-12">
                <Target className="w-8 h-8 skew-x-12" />
              </div>
              <h3 className="font-black text-lg uppercase tracking-widest italic">Foco Total</h3>
              <p className="text-xs text-gray-500 uppercase tracking-tight leading-relaxed">Energia mental e física para esmagar qualquer treino.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-[900] text-white uppercase italic tracking-tighter mb-4">
                BEST SELLERS
              </h2>
              <p className="text-brand-500 font-bold uppercase text-xs tracking-[0.4em]">A elite da suplementação brasileira</p>
            </div>
            <Link href="/produtos" className="group flex items-center gap-4 px-8 py-3 bg-dark-800 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-500 transition-colors border border-white/5">
              CONFIRA TODOS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      </section>
    </div>
  );
}
