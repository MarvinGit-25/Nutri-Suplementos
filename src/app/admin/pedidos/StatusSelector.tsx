"use client";

import { useState } from "react";
import { updateOrderStatus } from "./actions";
import { Loader2 } from "lucide-react";

interface StatusSelectorProps {
    orderId: string;
    initialStatus: string;
    colors: Record<string, string>;
    labels: Record<string, string>;
}

export function StatusSelector({ orderId, initialStatus, colors, labels }: StatusSelectorProps) {
    const [status, setStatus] = useState(initialStatus);
    const [isPending, setIsPending] = useState(false);

    const handleChange = async (newStatus: string) => {
        setIsPending(true);
        setStatus(newStatus);

        const result = await updateOrderStatus(orderId, newStatus);

        if (!result.success) {
            alert("Erro ao atualizar status: " + result.error);
            setStatus(initialStatus);
        }

        setIsPending(false);
    };

    return (
        <div className="relative inline-block">
            <select
                disabled={isPending}
                value={status}
                onChange={(e) => handleChange(e.target.value)}
                className={`appearance-none text-xs font-bold px-3 py-1 pr-8 rounded-full uppercase tracking-tighter cursor-pointer outline-none border-none transition-all ${colors[status] || "bg-gray-100"}`}
            >
                {Object.entries(labels).map(([val, label]) => (
                    <option key={val} value={val} className="bg-white text-gray-900 dark:bg-dark-900 dark:text-white font-sans normal-case">
                        {label}
                    </option>
                ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                {isPending ? (
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                ) : (
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </div>
        </div>
    );
}
