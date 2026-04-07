"use client";

import { useState } from "react";
import { Search, UserCircle } from "lucide-react";


interface Client {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    totalOrders: number;
    totalSpent: number;
}

export function ClientsTable({ initialClients }: { initialClients: Client[] }) {
    const [search, setSearch] = useState("");

    const filtered = initialClients.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou e-mail..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-dark-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>

            <div className="bg-dark-900 rounded-2xl border border-dark-800 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-wider bg-dark-800/50 border-b border-dark-800">
                            <th className="px-6 py-4 font-bold">Cliente</th>
                            <th className="px-6 py-4 font-bold">Cadastro</th>
                            <th className="px-6 py-4 font-bold text-center">Nº de Pedidos</th>
                            <th className="px-6 py-4 font-bold text-right">Total Gasto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-800/50">
                        {filtered.map(client => (
                            <tr key={client.id} className="hover:bg-dark-800/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-brand-500">
                                            <UserCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{client.name}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-0.5">{client.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">
                                    {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(client.createdAt))}
                                </td>
                                <td className="px-6 py-4 text-sm text-center">
                                    <span className={`font-bold px-2.5 py-1 rounded-full ${client.totalOrders > 0 ? "bg-brand-500/20 text-brand-400" : "bg-dark-800 text-gray-500"}`}>
                                        {client.totalOrders}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-white text-right">
                                    R$ {client.totalSpent.toFixed(2).replace(".", ",")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-dark-900/50">
                        <UserCircle className="w-16 h-16 mx-auto mb-4 text-dark-700" />
                        <h3 className="text-lg font-bold text-gray-400">Nenhum cliente encontrado</h3>
                        <p className="text-sm text-gray-500">Tente ajustar seus termos de busca.</p>
                    </div>
                )}
            </div>
        </>
    );
}
