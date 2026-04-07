"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Package, Loader2 } from "lucide-react";
import { deleteProduct, upsertProduct } from "./actions";
import { ImageUpload } from "@/components/ImageUpload";

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: { name: string };
    price: number;
    stock: number;
    imageUrl?: string | null;
}

interface Category { id: string; name: string; }

interface Props {
    products: Product[];
    categories: Category[];
    isCreateOnly?: boolean;
}

export function ProductsTable({ products, categories, isCreateOnly = false }: Props) {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [isPending, setIsPending] = useState(false);

    const [form, setForm] = useState({
        name: "",
        categoryName: "",
        price: "",
        stock: "",
        description: "",
        imageUrl: ""
    });

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.name.toLowerCase().includes(search.toLowerCase())
    );

    const openCreate = () => {
        setEditing(null);
        setForm({ name: "", categoryName: "", price: "", stock: "", description: "", imageUrl: "" });
        setShowModal(true);
    };

    const openEdit = (p: Product) => {
        setEditing(p);
        setForm({
            name: p.name,
            categoryName: p.category.name,
            price: String(p.price),
            stock: String(p.stock),
            description: p.description || "",
            imageUrl: p.imageUrl || ""
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.name || !form.price || !form.description) return;
        setIsPending(true);
        try {
            await upsertProduct({
                id: editing?.id,
                name: form.name,
                categoryName: form.categoryName,
                price: Number(form.price),
                stock: Number(form.stock),
                description: form.description,
                imageUrl: form.imageUrl
            });
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar produto.");
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        try {
            await deleteProduct(id);
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir produto.");
        }
    };

    if (isCreateOnly) {
        return (
            <>
                <button onClick={openCreate} className="flex items-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/25">
                    <Plus className="w-5 h-5" /> Novo Produto
                </button>
                {showModal && renderModal()}
            </>
        );
    }

    function renderModal() {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-gray-900 dark:text-white">
                <div className="bg-white dark:bg-dark-900 rounded-2xl w-full max-w-2xl border border-gray-100 dark:border-dark-800 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-800">
                        <h2 className="text-xl font-bold">{editing ? "Editar Produto" : "Novo Produto"}</h2>
                        <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nome do Produto</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                        placeholder="ex: Whey Protein 900g"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Categoria</label>
                                        <input
                                            type="text"
                                            list="categories-list"
                                            value={form.categoryName}
                                            onChange={e => setForm(f => ({ ...f, categoryName: e.target.value }))}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                            placeholder="ex: Proteína"
                                        />
                                        <datalist id="categories-list">
                                            {categories.map(c => <option key={c.id} value={c.name} />)}
                                        </datalist>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Estoque</label>
                                        <input
                                            type="number"
                                            value={form.stock}
                                            onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.price}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Imagem do Produto</label>
                                <ImageUpload
                                    value={form.imageUrl}
                                    onChange={(url) => setForm(f => ({ ...f, imageUrl: url }))}
                                    onRemove={() => setForm(f => ({ ...f, imageUrl: "" }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none h-32 resize-none"
                                placeholder="Descrição detalhada do produto..."
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 p-6 border-t border-gray-100 dark:border-dark-800 bg-gray-50 dark:bg-dark-800/50">
                        <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 dark:border-dark-700 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">Cancelar</button>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                        >
                            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                            {editing ? "Salvar Alterações" : "Criar Produto"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>

            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-dark-800/50 border-b border-gray-100 dark:border-dark-800">
                            <th className="px-6 py-4 font-bold text-gray-600 dark:text-gray-400">Nome</th>
                            <th className="px-6 py-4 font-bold text-gray-600 dark:text-gray-400">Categoria</th>
                            <th className="px-6 py-4 font-bold text-gray-600 dark:text-gray-400">Preço</th>
                            <th className="px-6 py-4 font-bold text-gray-600 dark:text-gray-400">Estoque</th>
                            <th className="px-6 py-4 font-bold text-gray-600 dark:text-gray-400">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-dark-800/50">
                        {filtered.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-gray-900 dark:text-white line-clamp-1">{product.name}</div>
                                    <div className="text-xs text-gray-400 font-mono mt-0.5">{product.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500 uppercase tracking-tight">
                                        {product.category.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">R$ {product.price.toFixed(2).replace(".", ",")}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`font-bold ${product.stock > 50 ? "text-emerald-600" : product.stock > 10 ? "text-amber-600" : "text-red-600"}`}>
                                        {product.stock} un.
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(product)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors text-gray-500 hover:text-brand-600">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-gray-500 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-dark-900/50">
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-dark-700" />
                        <h3 className="text-lg font-bold text-gray-400">Nenhum produto encontrado</h3>
                        <p className="text-sm text-gray-500">Tente ajustar seus termos de busca.</p>
                    </div>
                )}
            </div>

            {showModal && renderModal()}
        </>
    );
}
