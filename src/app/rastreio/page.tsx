import { Map } from "lucide-react";
import { TrackingUI } from "./TrackingUI";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rastreio Oficial | XNUTRI",
    description: "Acompanhe o status do seu pedido com o código de rastreio da XNUTRI.",
};

export default function RastreioPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <Map className="w-12 h-12 text-brand-500 mx-auto mb-4" />
                <h1 className="text-4xl font-black tracking-tighter uppercase text-white">
                    Rastreie seu Pedido
                </h1>
                <p className="text-gray-400 text-lg mt-2">
                    Acompanhe a viagem do seu hipercombustível até a porta da sua casa.
                </p>
            </div>

            <TrackingUI />
        </div>
    );
}
