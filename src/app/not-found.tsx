"use client";

import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900 text-white p-8">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-black mb-4">404</h1>
        <p className="text-lg mb-6">Página não encontrada. O conteúdo que você procura pode ter sido removido ou o endereço está incorreto.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para a loja
        </Link>
        <div className="mt-8 flex justify-center">
          <Search className="w-12 h-12 text-brand-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
