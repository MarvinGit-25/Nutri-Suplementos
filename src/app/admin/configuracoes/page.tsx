import { getSettings } from "./actions";
import { SettingsForm } from "./SettingsForm";
import { Settings } from "lucide-react";

export const metadata = { title: "Configurações | Admin" };

export default async function ConfiguracoesPage() {
    const settings = await getSettings();

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-3">
                    <Settings className="w-8 h-8 text-brand-500" />
                    Configurações da Loja
                </h1>
                <p className="text-gray-400 mt-1">Ajuste os parâmetros principais do seu e-commerce.</p>
            </div>
            
            <SettingsForm initialSettings={settings} />
        </div>
    );
}
