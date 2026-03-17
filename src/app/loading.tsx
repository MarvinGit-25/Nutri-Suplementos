"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white/50 dark:bg-dark-950/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className="bg-white dark:bg-dark-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-dark-800 flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
                <p className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm text-center">
                    Carregando...
                </p>
                <div className="w-32 h-1 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-500 w-1/2 animate-[shimmer_1.5s_infinite]"></div>
                </div>
            </div>
        </div>
    );
}
