import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-dark-900 border-t border-dark-800 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-1 mb-4">
                            <span className="text-2xl font-black tracking-tighter text-brand-500 uppercase">XNUTRI</span>
                        </Link>
                        <p className="text-sm text-gray-400 max-w-sm">
                            Os melhores suplementos para o seu treino. Qualidade garantida e entrega rápida para todo o Brasil.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categorias</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/categorias/proteinas" className="hover:text-brand-500 transition-colors">Whey Protein</Link></li>
                            <li><Link href="/categorias/creatina" className="hover:text-brand-500 transition-colors">Creatina</Link></li>
                            <li><Link href="/categorias/pre-treino" className="hover:text-brand-500 transition-colors">Pré-Treino</Link></li>
                            <li><Link href="/categorias/vitaminas" className="hover:text-brand-500 transition-colors">Vitaminas</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Atendimento</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/contato" className="hover:text-brand-500 transition-colors">Fale Conosco</Link></li>
                            <li><Link href="/rastreio" className="hover:text-brand-500 transition-colors">Rastrear Pedido</Link></li>
                            <li><Link href="/trocas" className="hover:text-brand-500 transition-colors">Trocas e Devoluções</Link></li>
                            <li><Link href="/contato#faq" className="hover:text-brand-500 transition-colors">Dúvidas Frequentes</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} XNUTRI. Todos os direitos reservados.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
                        <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
