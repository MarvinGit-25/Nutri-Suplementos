"use client";

import { useCartStore } from "@/store/cartStore";
import { Shield, Truck, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createOrder } from "./actions";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [isPending, setIsPending] = useState(false);
    const [step, setStep] = useState<"form" | "success">("form");
    const { data: session } = useSession();
    const [form, setForm] = useState({
        name: "",
        email: "",
        cpf: "",
        cep: "",
        address: "",
        number: "",
        city: "",
        state: "",
        payment: "pix"
    });

    useEffect(() => {
        if (session?.user) {
            setForm(f => ({
                ...f,
                name: session.user?.name || f.name,
                email: session.user?.email || f.email
            }));
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        try {
            // 1. Create order in database
            const order = await createOrder({
                ...form,
                items: items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price }))
            });

            // 2. Initiate Mercado Pago payment
            const response = await fetch("/api/pagamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
                    payer: { name: form.name, email: form.email },
                    orderId: order.id
                })
            });

            const paymentData = await response.json();

            if (paymentData.init_point) {
                // If the user chooses a payment that redirects (like Card or Boleto)
                // In a real app, for PIX we might show a QR code directly.
                // For now, let's redirect to MP checkout or simulate success.
                window.location.href = paymentData.init_point;
                clearCart();
            } else {
                // Fallback / Success simulation
                setStep("success");
                clearCart();
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao processar pedido. Tente novamente.");
        } finally {
            setIsPending(false);
        }
    };

    if (step === "success") {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h1 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">Pedido Realizado! 🎉</h1>
                    <p className="text-gray-500 mb-8">Seu pedido foi confirmado e você será redirecionado para o pagamento.</p>
                    <Link href="/" className="inline-block px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/25">
                        Voltar para a Loja
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-black mb-4">Seu carrinho está vazio</h1>
                    <Link href="/produtos" className="inline-block px-8 py-4 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors">
                        Explorar Produtos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-black mb-10 text-inherit uppercase tracking-tight">Finalizar Compra</h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
                    {/* Personal */}
                    <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-100 dark:border-dark-800 shadow-sm">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            Dados Pessoais
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1.5">Nome Completo</label>
                                <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Seu nome completo" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5">E-mail</label>
                                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="seu@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5">CPF</label>
                                <input required type="text" value={form.cpf} onChange={e => setForm(f => ({ ...f, cpf: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="000.000.000-00" />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-100 dark:border-dark-800 shadow-sm">
                        <h2 className="text-lg font-bold mb-6">Endereço de Entrega</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-semibold mb-1.5">CEP</label>
                                <input required type="text" value={form.cep} onChange={e => setForm(f => ({ ...f, cep: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="00000-000" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1.5">Rua / Avenida</label>
                                <input required type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Nome da rua" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5">Número</label>
                                <input required type="text" value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="123" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5">Cidade</label>
                                <input required type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Sua cidade" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5">Estado</label>
                                <input required type="text" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="SP" />
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-100 dark:border-dark-800 shadow-sm">
                        <h2 className="text-lg font-bold mb-6">Forma de Pagamento</h2>
                        <div className="space-y-4">
                            {[
                                { value: "pix", label: "PIX", desc: "Aprovação instantânea - Envio mais rápido" },
                                { value: "cartao", label: "Cartão de Crédito", desc: "Em até 12x sem juros" },
                                { value: "boleto", label: "Boleto Bancário", desc: "Aprovação em até 48h úteis" },
                            ].map(opt => (
                                <label key={opt.value} className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${form.payment === opt.value ? "border-brand-500 bg-brand-50 dark:bg-brand-900/10 shadow-sm" : "border-gray-200 dark:border-dark-700 hover:border-brand-300"}`}>
                                    <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={e => setForm(f => ({ ...f, payment: e.target.value }))} className="accent-brand-500 w-5 h-5" />
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{opt.label}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-5 bg-black dark:bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 uppercase tracking-wider"
                    >
                        {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Lock className="w-6 h-6" />}
                        Finalizar e Pagar
                    </button>
                    <p className="text-center text-xs text-gray-400">Você será redirecionado para o ambiente seguro do Mercado Pago.</p>
                </form>

                {/* Summary */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 sticky top-32 shadow-sm">
                        <div className="p-6 border-b border-gray-100 dark:border-dark-800">
                            <h2 className="text-lg font-bold">Resumo do Pedido</h2>
                        </div>
                        <div className="p-6 space-y-5 max-h-[40vh] overflow-y-auto">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="font-bold text-sm leading-snug line-clamp-2">{item.name}</p>
                                        <p className="text-gray-400 text-xs mt-1">Quantidade: {item.quantity}</p>
                                    </div>
                                    <span className="font-black text-gray-900 dark:text-white ml-4 text-sm whitespace-nowrap">
                                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-gray-100 dark:border-dark-800 space-y-4">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900 dark:text-white">R$ {getTotalPrice().toFixed(2).replace(".", ",")}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Frete</span>
                                <span className="text-emerald-500 font-bold uppercase text-xs">Grátis</span>
                            </div>
                            <div className="flex justify-between items-end pt-3 border-t border-gray-100 dark:border-dark-800">
                                <span className="font-bold text-gray-900 dark:text-white">Total</span>
                                <span className="text-3xl font-black text-brand-600 dark:text-brand-500">
                                    R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-dark-800/50 rounded-b-2xl space-y-3">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <Shield className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                <span>Criptografia de ponta a ponta e pagamentos processados com segurança.</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <Truck className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                <span>Entrega rápida em todo o Brasil com código de rastreio por e-mail.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
