import { getClients } from "./actions";
import { ClientsTable } from "./ClientsTable";
import { Users } from "lucide-react";

export const dynamic = 'force-dynamic';
export const metadata = { title: "Clientes | Admin" };

export default async function ClientesPage() {
    const clients = await getClients();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-3">
                        <Users className="w-8 h-8 text-brand-500" />
                        Clientes Registrados
                    </h1>
                    <p className="text-gray-400 mt-1">Gerencie os usuários cadastrados na sua loja.</p>
                </div>
            </div>
            
            <ClientsTable initialClients={clients} />
        </div>
    );
}
