import { Mail, Phone, MapPin, MessageCircle, HelpCircle, Package, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Central de Atendimento | XNUTRI" };

const faqs = [
    {
        q: "Como rastrear meu pedido?",
        a: "Após a confirmação do pagamento, você receberá um código de rastreio por e-mail em até 24 horas. Insira o código na página dos Correios ou Transportadora correspondente para acompanhar."
    },
    {
        q: "Qual o prazo de entrega?",
        a: "O prazo varia conforme a sua região. Para o Sudeste, geralmente de 2 a 5 dias úteis. Para demais regiões, de 5 a 12 dias úteis."
    },
    {
        q: "Os produtos são originais?",
        a: "Sim! Trabalhamos apenas com suplementos 100% autênticos adquiridos diretamente dos distribuidores oficiais das marcas no Brasil."
    },
];

export default function ContatoPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-white">
                    Central de Atendimento
                </h1>
                <p className="text-gray-400 text-lg">
                    Estamos aqui para ajudar você a alcançar seus objetivos. Tire suas dúvidas, envie uma mensagem ou fale conosco.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Contact Forms & Info (Col 1/2) */}
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* Send Message Form */}
                    <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Mail className="w-6 h-6 text-brand-500" />
                            Envie uma Mensagem
                        </h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-400">Seu Nome</label>
                                    <input type="text" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-white" placeholder="João da Silva" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-400">E-mail</label>
                                    <input type="email" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-white" placeholder="joao@exemplo.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-400">Assunto</label>
                                <select className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-white">
                                    <option>Dúvida sobre produto</option>
                                    <option>Status do meu Pedido</option>
                                    <option>Troca e Devolução</option>
                                    <option>Outros assuntos</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-400">Mensagem</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-white resize-none" placeholder="Como podemos ajudar?"></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/20">
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>

                    {/* FAQ */}
                    <div id="faq" className="scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <HelpCircle className="w-6 h-6 text-brand-500" />
                            Dúvidas Frequentes (FAQ)
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
                                    <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info (Col 3) */}
                <div className="space-y-8">
                    {/* Quick Contacts */}
                    <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 shadow-xl space-y-6">
                        <h3 className="font-bold uppercase tracking-wider text-sm text-gray-400">Canais Rápidos</h3>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-brand-500 shrink-0">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-white">WhatsApp</p>
                                <p className="text-sm text-gray-400 mt-1">Resposta super rápida em horário comercial.</p>
                                <Link href="#" className="text-brand-500 text-sm font-bold hover:underline mt-1 inline-block">Chamar no WhatsApp &rarr;</Link>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-brand-500 shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-white">E-mail</p>
                                <p className="text-sm text-gray-400 mt-1">Geralmente respondemos em até 2 horas.</p>
                                <p className="text-brand-500 text-sm font-bold mt-1">contato@xnutri.com.br</p>
                            </div>
                        </div>
                    </div>

                    {/* Policies Links Base */}
                    <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 shadow-xl space-y-4">
                        <h3 className="font-bold uppercase tracking-wider text-sm text-gray-400">Links Úteis</h3>
                        
                        <Link href="#faq" className="flex items-center gap-3 p-3 bg-dark-800 rounded-xl hover:bg-dark-700 transition-colors group">
                            <Package className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors" />
                            <div className="text-sm font-medium text-gray-300">Rastrear Pedido</div>
                        </Link>
                        
                        <Link href="#faq" className="flex items-center gap-3 p-3 bg-dark-800 rounded-xl hover:bg-dark-700 transition-colors group">
                            <ArrowRightLeft className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors" />
                            <div className="text-sm font-medium text-gray-300">Trocas e Devoluções</div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
