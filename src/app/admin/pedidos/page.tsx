import { prisma } from "@/lib/prisma";
import { ShoppingBag } from "lucide-react";
import { StatusSelector } from "./StatusSelector";

export const dynamic = 'force-dynamic';

export default async function AdminPedidos() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    const statusColor: Record<string, string> = {
        "DELIVERED": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        "SHIPPED": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        "PAID": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        "PENDING": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        "CANCELED": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    const statusLabel: Record<string, string> = {
        "PENDING": "Pendente",
        "PAID": "Pago",
        "SHIPPED": "Enviado",
        "DELIVERED": "Entregue",
        "CANCELED": "Cancelado",
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Pedidos</h1>
                    <p className="text-gray-500 mt-1">Gerencie as vendas da sua loja.</p>
                </div>
                <div className="text-sm font-bold text-gray-400">
                    Total: <span className="text-brand-500">{orders.length}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-dark-800/50 border-b border-gray-100 dark:border-dark-800">
                                <th className="px-6 py-4 font-bold">Pedido</th>
                                <th className="px-6 py-4 font-bold">Cliente</th>
                                <th className="px-6 py-4 font-bold">Endereço</th>
                                <th className="px-6 py-4 font-bold">Produtos</th>
                                <th className="px-6 py-4 font-bold">Total</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-dark-800/50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/30 transition-colors align-top">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-mono font-bold text-brand-600">
                                            #{order.id.slice(-8).toUpperCase()}
                                        </div>
                                        <div className="text-[10px] text-gray-400 mt-1">
                                            {new Date(order.createdAt).toLocaleString("pt-BR")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.user.name}</span>
                                            <span className="text-xs text-gray-400">{order.user.email}</span>
                                            {order.cpf && <span className="text-[10px] text-gray-400 font-mono mt-1">CPF: {order.cpf}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.address ? (
                                            <div className="text-[11px] text-gray-500 space-y-0.5 max-w-[200px]">
                                                <p className="font-medium text-gray-700 dark:text-gray-300">
                                                    {order.address}, {order.number}
                                                </p>
                                                {order.complement && <p>{order.complement}</p>}
                                                <p>{order.city} - {order.state}</p>
                                                <p>{order.cep}</p>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-red-500">Sem endereço</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs text-gray-500 space-y-1">
                                            {order.items.map(i => (
                                                <div key={i.id} className="line-clamp-1">
                                                    <span className="font-bold">{i.quantity}x</span> {i.product.name}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-black text-gray-900 dark:text-white">
                                            R$ {order.total.toFixed(2).replace(".", ",")}
                                        </div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold mt-1">
                                            {order.paymentMethod || "Não informado"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusSelector
                                            orderId={order.id}
                                            initialStatus={order.status}
                                            colors={statusColor}
                                            labels={statusLabel}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <div className="text-center py-24 bg-gray-50 dark:bg-dark-900/50">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-dark-700" />
                            <h3 className="text-lg font-bold text-gray-400">Nenhum pedido realizado</h3>
                            <p className="text-sm text-gray-500">As vendas aparecerão aqui conforme os clientes finalizarem a compra.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
