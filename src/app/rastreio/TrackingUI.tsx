"use client";
import { useState } from "react";
import { Search, PackageOpen, Truck, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export function TrackingUI() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<null | 'success' | 'not_found'>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code || code.length < 5) return;
        
        setIsLoading(true);
        setResult(null);

        // Simulation delay
        setTimeout(() => {
            setIsLoading(false);
            if (code.toUpperCase().includes("BR")) {
                setResult('success');
            } else {
                setResult('not_found');
            }
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative mb-12">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Digite seu código (Ex: PX123456789BR)"
                    className="w-full pl-6 pr-16 py-4 bg-dark-900 border-2 border-dark-800 focus:border-brand-500 rounded-2xl text-lg text-white font-mono uppercase outline-none transition-colors shadow-xl"
                />
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all"
                >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
            </form>

            {/* Empty State */}
            {!result && !isLoading && (
                <div className="text-center text-gray-500 py-12">
                    <PackageOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Insira seu código de rastreio acima para acompanhar a entrega.</p>
                </div>
            )}

            {/* Error State */}
            {result === 'not_found' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold">Código não localizado</h3>
                    <p className="text-sm mt-1 text-red-400/80">Verifique se o código possui a sigla &quot;BR&quot; e tente novamente. Pode levar até 24h para atualizar no sistema do frete.</p>
                </div>
            )}

            {/* Success Status Map Simulation */}
            {result === 'success' && (
                <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 shadow-xl animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <h3 className="font-bold text-white mb-8 border-b border-dark-800 pb-4">Status do Encomenda Funcional: <span className="text-brand-500 font-mono ml-2">{code.toUpperCase()}</span></h3>
                    
                    <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-dark-700 before:to-transparent">
                        
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500 text-white shrink-0 md:order-1 md:self-center shadow-lg shadow-brand-500/30 ring-4 ring-dark-900">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-dark-800 border border-dark-700 mx-2 shadow group-hover:border-brand-500/50 transition-colors">
                                <span className="text-xs font-bold text-brand-500 tracking-wide uppercase">Hoje às 08:32</span>
                                <h4 className="text-white font-bold mt-1">Saiu para Entrega ao Destinatário</h4>
                                <p className="text-sm text-gray-400 mt-1">Sua encomenda está no caminhão da última milha.</p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-800 text-gray-400 shrink-0 md:order-1 md:self-center ring-4 ring-dark-900">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl opacity-60">
                                <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">Ontem às 14:15</span>
                                <h4 className="text-gray-300 font-bold mt-1">Em Trânsito</h4>
                                <p className="text-sm text-gray-500 mt-1">De: Centro de Distribuição (SP) Para: Unidade Local</p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-800 text-gray-400 shrink-0 md:order-1 md:self-center ring-4 ring-dark-900">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl opacity-60">
                                <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">Sexta às 09:10</span>
                                <h4 className="text-gray-300 font-bold mt-1">Objeto Postado</h4>
                                <p className="text-sm text-gray-500 mt-1">O remetente entregou seu pacote aos Correios.</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
