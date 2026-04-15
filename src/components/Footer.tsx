import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 text-gray-500 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center group">
                             <span className="text-3xl font-[900] tracking-tighter text-white uppercase italic flex items-baseline gap-2">
                                X<span className="text-brand-500 group-hover:text-white transition-colors">NUTRI</span>
                                <span className="text-xs tracking-[0.2em] text-gray-700 font-black group-hover:text-white transition-colors">SUPLEMENTOS</span>
                            </span>
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-loose max-w-sm">
                            Suplementação bruta para resultados reais. <br />
                            Qualidade garantida em cada dose.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-black mb-6 text-xs uppercase tracking-[0.3em] italic">Linha de Produtos</h3>
                        <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest">
                            <li><Link href="/categorias/proteinas" className="hover:text-brand-500 transition-colors">Whey Protein</Link></li>
                            <li><Link href="/categorias/creatina" className="hover:text-brand-500 transition-colors">Creatina</Link></li>
                            <li><Link href="/categorias/pre-treino" className="hover:text-brand-500 transition-colors">Pré-Treino</Link></li>
                            <li><Link href="/categorias/vitaminas" className="hover:text-brand-500 transition-colors">Vitaminas</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-black mb-6 text-xs uppercase tracking-[0.3em] italic">Suporte</h3>
                        <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest">
                            <li><Link href="/contato" className="hover:text-brand-500 transition-colors">Fale Conosco</Link></li>
                            <li><Link href="/rastreio" className="hover:text-brand-500 transition-colors">Rastrear Pedido</Link></li>
                            <li><Link href="/trocas" className="hover:text-brand-500 transition-colors">Trocas e Devoluções</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em]">
                    <p>&copy; {new Date().getFullYear()} XNUTRI SUPLEMENTOS. BRAZIL BRAND.</p>
                    <div className="flex space-x-6 mt-6 md:mt-0">
                        <Link href="/termos" className="hover:text-white transition-colors">Termos</Link>
                        <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
