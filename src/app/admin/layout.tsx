import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, ChevronRight } from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/produtos", label: "Produtos", icon: Package },
    { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
    { href: "/admin/clientes", label: "Clientes", icon: Users },
    { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-dark-950">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-900 text-white flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-dark-800">
                    <Link href="/" className="text-xl font-black tracking-tighter">
                        NUTRI<span className="text-brand-500">SUP</span>
                        <span className="ml-2 text-xs font-medium bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full">Admin</span>
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-dark-800">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">AD</div>
                        <div>
                            <p className="text-sm font-medium text-white">Admin</p>
                            <p className="text-xs text-gray-500">admin@nutrisup.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-grow overflow-auto">
                {children}
            </main>
        </div>
    );
}
