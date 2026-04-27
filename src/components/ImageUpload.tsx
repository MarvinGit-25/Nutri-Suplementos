"use client";

import { useState } from "react";
import { ImagePlus, Loader2, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error(error);
            alert("Erro ao fazer upload da imagem.");
        } finally {
            setIsUploading(false);
        }
    };

    if (value) {
        return (
            <div className="relative w-full aspect-square bg-gray-50 dark:bg-dark-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-700 group">
                <Image
                    src={value}
                    alt="Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        onClick={() => onRemove()}
                        type="button"
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm px-2 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Salvo</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />
            <div className={`
        w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 transition-all
        ${isUploading
                    ? "border-brand-300 bg-brand-50/10"
                    : "border-gray-200 dark:border-dark-700 hover:border-brand-400 hover:bg-gray-50 dark:hover:bg-dark-800/50"}
      `}>
                {isUploading ? (
                    <>
                        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-3" />
                        <p className="text-sm font-bold text-brand-600 dark:text-brand-400">Enviando...</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Aguarde um momento</p>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-800 text-gray-400 dark:text-dark-600 flex items-center justify-center mb-3 group-hover:text-brand-500 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 transition-colors">
                            <ImagePlus className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Carregar Imagem</p>
                        <p className="text-[10px] text-gray-400 dark:text-dark-500 mt-1 uppercase tracking-widest">PNG, JPG ou WebP</p>
                    </>
                )}
            </div>
        </div>
    );
}
