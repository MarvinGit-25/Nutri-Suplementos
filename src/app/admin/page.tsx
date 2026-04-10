import { DollarSign, Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Fetch real stats from Prisma
    const [totalOrders, totalProducts, totalUsers, successfulOrders] = await Promise.all([
        prisma.order.count(),
        prisma.product.count(),
        prisma.user.count({ where: { role: "USER" } }),
        prisma.order.findMany({
            where: { status: "PAID" },
            select: { total: true }
        })
    ]);

    const totalRevenue = successfulOrders.reduce((acc, curr) => acc + curr.total, 0);

    const recentOrders = await prisma.order.findMany({
        take: 5,
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

    const stats = [
        { label: "Receita Total", value: `R$ ${totalRevenue.toFixed(2).replace(".", ",")}`, change: "+0%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Total de Pedidos", value: String(totalOrders), change: "+0%", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Produtos", value: String(totalProducts), change: "+0", icon: Package, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Clientes", value: String(totalUsers), change: "+0", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
    ];

    const statusColor: Record<string, string> = {
        "DELIVERED": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        "SHIPPED": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        "PAID": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        "PENDING": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        "CANCELED": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    const statusLabel: Record<string, string> = {
        "DELIVERED": "Entregue",
        "SHIPPED": "Enviado",
        "PAID": "Pago",
        "PENDING": "Pendente",
        "CANCELED": "Cancelado",
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 mt-1">Bem-vindo de volta! Aqui está o resumo da sua loja.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-100 dark:border-dark-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100 dark:border-dark-800 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pedidos Recentes</h2>
                    <Link href="/admin/pedidos" className="text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors">Ver todos →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-dark-800/50 border-b border-gray-100 dark:border-dark-800">
                                <th className="px-6 py-4 font-bold">Pedido</th>
                                <th className="px-6 py-4 font-bold">Cliente</th>
                                <th className="px-6 py-4 font-bold">Resumo</th>
                                <th className="px-6 py-4 font-bold">Valor</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-dark-800/50">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/30 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono font-medium text-gray-900 dark:text-white">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{order.user.name || "Cliente"}</div>
                                        <div className="text-xs text-gray-400">{order.user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                        {order.items.map(i => i.product.name).join(", ")}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                                        R$ {order.total.toFixed(2).replace(".", ",")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[order.status] || "bg-gray-100 text-gray-600"}`}>
                                            {statusLabel[order.status] || order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {recentOrders.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 dark:bg-dark-900/50">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-dark-700" />
                            <h3 className="text-lg font-bold text-gray-400">Nenhum pedido recente</h3>
                            <p className="text-sm text-gray-500 font-medium">Os novos pedidos aparecerão aqui automaticamente.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
