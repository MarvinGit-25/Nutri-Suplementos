import { Scale, RotateCcw, AlertTriangle, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trocas e Devoluções | XNUTRI",
    description: "Política de trocas e devoluções da XNUTRI com direito de arrependimento, avarias e orientações de suporte.",
};

export default function TrocasPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
            <div className="mb-12 text-center">
                <RotateCcw className="w-12 h-12 text-brand-500 mx-auto mb-4" />
                <h1 className="text-4xl font-black tracking-tighter uppercase text-white">
                    Trocas e Devoluções
                </h1>
                <p className="text-gray-400 text-lg mt-2">
                    Transparência e segurança para suas compras.
                </p>
            </div>

            <div className="space-y-8 text-gray-300">
                <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Scale className="w-6 h-6 text-brand-500" />
                        Direito de Arrependimento
                    </h2>
                    <p className="leading-relaxed mb-4">
                        Conforme o Código de Defesa do Consumidor (Art. 49), você tem o direito de se arrepender da compra e solicitar a devolução do produto em até <strong>7 (sete) dias corridos</strong> a partir da data de recebimento do pedido.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                        <li>O produto deve estar <strong>intacto e lacrado</strong>, na embalagem original, sem indícios de uso ou violação do lacre original do fabricante.</li>
                        <li>Brindes promocionais enviados junto ao produto devolvido também devem ser retornados.</li>
                        <li>O reembolso é feito via o mesmo método de pagamento utilizado na compra em até 5 dias úteis após a conferência em nosso centro logístico.</li>
                    </ul>
                </div>

                <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-brand-500" />
                        Produtos com Defeito ou Avaria Logística
                    </h2>
                    <p className="leading-relaxed mb-4">
                        Caso o seu produto chegue danificado devido ao transporte (potes quebrados, umidade, embalagem rasgada) ou apresente alguma anomalia de fabricação (prazo de até 30 dias para notificação), a XNUTRI arcará com 100% dos custos logísticos de substituição.
                    </p>
                    <div className="bg-dark-800/50 border border-dark-700 p-4 rounded-xl text-sm mt-4">
                        <strong className="text-white block mb-1">Passo a Passo:</strong>
                        1. Tire fotos nítidas mostrando a avaria e a caixa de entrega.<br />
                        2. Entre em contato conosco pelo WhatsApp nas primeiras 48h do recebimento.<br />
                        3. Enviaremos uma etiqueta de autorização reversa para postagem gratuita da devolução.
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-dark-800">
                    <h3 className="text-xl font-bold text-white mb-4">Precisa iniciar uma devolução agora?</h3>
                    <Link href="/contato" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-brand-500/20">
                        <MessageCircle className="w-5 h-5" />
                        Falar com a Equipe
                    </Link>
                </div>
            </div>
        </div>
    );
}
