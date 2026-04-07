"use client";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateSettings } from "./actions";

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
    const [form, setForm] = useState(initialSettings);
    const [isPending, setIsPending] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        try {
            await updateSettings(form);
            alert("Configurações salvas com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar configurações.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="bg-dark-900 border border-dark-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Nome da Loja</label>
                    <input
                        type="text"
                        value={form.storeName || ""}
                        onChange={e => setForm(f => ({ ...f, storeName: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">E-mail de Contato</label>
                    <input
                        type="email"
                        value={form.contactEmail || ""}
                        onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Telefone / WhatsApp</label>
                    <input
                        type="text"
                        value={form.contactPhone || ""}
                        onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Taxa de Entrega Fixa (R$)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={form.deliveryFee || ""}
                        onChange={e => setForm(f => ({ ...f, deliveryFee: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-dark-800 flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Salvar Configurações
                </button>
            </div>
        </form>
    );
}
