import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Package, ShoppingBag, User as UserIcon, Calendar, CreditCard, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=/conta");
    }

    const userId = session.user.id;

    if (!userId) {
        return <div className="p-20 text-center">Erro ao carregar usuário.</div>;
    }

    const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    const statusLabel: Record<string, string> = {
        "PENDING": "Pendente",
        "PAID": "Pago",
        "SHIPPED": "Enviado",
        "DELIVERED": "Entregue",
        "CANCELED": "Cancelado",
    };

    const statusColor: Record<string, string> = {
        "DELIVERED": "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10",
        "SHIPPED": "text-blue-500 bg-blue-50 dark:bg-blue-900/10",
        "PAID": "text-amber-500 bg-amber-50 dark:bg-amber-900/10",
        "PENDING": "text-gray-500 bg-gray-50 dark:bg-gray-800",
        "CANCELED": "text-red-500 bg-red-50 dark:bg-red-900/10",
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-dark-900 rounded-3xl p-8 border border-gray-100 dark:border-dark-800 shadow-sm text-center">
                        <div className="w-24 h-24 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-dark-800 shadow-lg">
                            <UserIcon className="w-12 h-12 text-brand-500" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white line-clamp-1">{session.user.name}</h2>
                        <p className="text-sm text-gray-500 mb-6">{session.user.email}</p>

                        <div className="pt-6 border-t border-gray-100 dark:border-dark-800 space-y-3 text-left">
                            <div className="flex items-center gap-3 text-xs text-gray-500 uppercase font-black tracking-widest">
                                Resumo da Conta
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Total de Pedidos</span>
                                <span className="font-bold text-gray-900 dark:text-white">{orders.length}</span>
                            </div>
                        </div>
                    </div>

                    <nav className="bg-white dark:bg-dark-900 rounded-3xl p-4 border border-gray-100 dark:border-dark-800 shadow-sm space-y-1">
                        <a href="/conta" className="flex items-center gap-3 px-4 py-3 bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/25">
                            <ShoppingBag className="w-5 h-5" />
                            Meus Pedidos
                        </a>
                        <a href="/produtos" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-xl text-gray-600 dark:text-gray-400 font-bold transition-all">
                            <Package className="w-5 h-5" />
                            Continuar Comprando
                        </a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Meus Pedidos</h1>
                        <p className="text-gray-500 mt-1">Acompanhe o status e histórico de suas compras.</p>
                    </div>

                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white dark:bg-dark-900 rounded-3xl border border-gray-100 dark:border-dark-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 border-b border-gray-100 dark:border-dark-800 flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Pedido</p>
                                                <p className="font-mono font-bold text-brand-600">#{order.id.slice(-8).toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Data</p>
                                                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total</p>
                                                <p className="text-sm font-black text-gray-900 dark:text-white">R$ {order.total.toFixed(2).replace(".", ",")}</p>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${statusColor[order.status] || "bg-gray-100"}`}>
                                            {statusLabel[order.status] || order.status}
                                        </div>
                                    </div>

                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Itens</p>
                                            <div className="space-y-3">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex gap-4 items-center">
                                                        <div className="w-12 h-12 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-100 dark:border-dark-800 flex-shrink-0 overflow-hidden">
                                                            {item.product.imageUrl && (
                                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{item.product.name}</p>
                                                            <p className="text-xs text-gray-500">{item.quantity}x • R$ {item.price.toFixed(2).replace(".", ",")}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Entrega e Pagamento</p>
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                                    <div className="text-xs text-gray-500 leading-relaxed">
                                                        {order.address ? (
                                                            <>
                                                                <p className="font-bold text-gray-700 dark:text-gray-300">{order.address}, {order.number}</p>
                                                                <p>{order.city} - {order.state} | {order.cep}</p>
                                                            </>
                                                        ) : (
                                                            <p>Informação de entrega indisponível</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <CreditCard className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                                    <div className="text-xs text-gray-500 uppercase font-bold">
                                                        {order.paymentMethod || "Não informado"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-gray-50 dark:bg-dark-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-dark-800">
                            <ShoppingBag className="w-20 h-20 text-gray-200 dark:text-dark-800 mx-auto mb-6" />
                            <h3 className="text-xl font-black text-gray-400 uppercase tracking-tight">Você ainda não tem pedidos</h3>
                            <p className="text-gray-500 mt-2">Seus pedidos aparecerão aqui assim que você finalizar uma compra.</p>
                            <a href="/produtos" className="inline-block mt-8 px-8 py-4 bg-brand-500 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20">
                                Explorar Produtos
                            </a>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
