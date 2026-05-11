import { useEffect, useState } from "preact/hooks";
import type { Category } from "../types"
import { addProduct, editCategory, getData } from "../scripts/localStorage";

interface Props {
    catId: number;
    category: Category;
    handleAddProduct: (catId: number, newProductName: string, newProductPrice: number) => void;
    handleDeleteCategory: (catId: number) => void;
    hanldeEditCategory: (catId: number) => void;
    handleDeleteProduct: (catId: number, prodId: number) => void;
    handleEditProduct: (catId: number, prodId: number) => void;
}

export default function CategoryContainer({ category, catId, handleAddProduct, handleDeleteCategory, hanldeEditCategory, handleDeleteProduct, handleEditProduct }: Props) {
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState(0);
    
    const formatPrice = (p: any) => {
        return '$' + parseFloat(p).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    const toggleSection = (catId: number) => {
        const sectionBody = document.getElementById(`sec-${catId}`);
        const chevron = document.getElementById(`chev-${catId}`);

        if(!sectionBody || !chevron) {
            console.error("Wrong section ID");
            return
        }

        sectionBody.classList.toggle("hidden");
        chevron.classList.toggle("rotate-90");
    }

    return (
        <div class="section mb-6 overflow-hidden bg-white border-[1.5px] border-amber-900/20 rounded-xl">
            <div id={`${catId}`} class="section-header flex items-center gap-2.5 px-5 py-4 bg-rose-50 border-b border-b-amber-950/20 cursor-pointer hover:bg-rose-200" onClick={(e) => toggleSection(catId)}>
                <span class="chevron text-xs transition-transform rotate-90" id={`chev-${catId}`}>▶</span>
                <span class="section-name flex-1">{category.name}</span>
                <span class="section-count text-xs bg-white border border-amber-900/20 rounded-xl px-2 py-1">{category.products.length} producto{category.products.length !== 1 ? 's' : ''}</span>
                <div class="section-actions flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                    <button class="btn py-1.5 px-3 border-transparent hover:bg-rose-100 hover:border-rose-400" title="Renombrar" onClick={(e) => hanldeEditCategory(catId)}>✏️</button>
                    <button class="btn py-1.5 px-3 border-transparent hover:bg-rose-100 hover:border-rose-400" title="Eliminar categoría" onClick={(e) => handleDeleteCategory(catId)}>🗑</button>
                </div>
            </div>
            <div class="section-body" id={`sec-${catId}`}>
                {category.products.length === 0 ? <p style="padding:0.75rem 1.25rem;font-size:0.85rem;color:var(--text-muted)">Sin productos aún.</p> : ''}
                {category.products.map((p, pi) => 
                    <div class="product-row flex items-center gap-2.5 py-2.5 px-5 border-b border-b-amber-800/20 transition-all duration-100 hover:bg-rose-100">
                        <span class="product-name flex-1">{p.name}</span>
                        <span class="product-price">{formatPrice(p.price)}</span>
                        <button class="btn py-2 px-3 border-transparent hover:bg-rose-300 hover:border-rose-400" title="Editar" onClick={(e) => handleEditProduct(catId, p.id)}>✏️</button>
                        <button class="btn py-2 px-3 border-transparent hover:bg-red-700" title="Eliminar" onClick={(e) => handleDeleteProduct(catId, p.id)}>🗑</button>
                    </div>
                )}
                <div class="add-product-row flex lg:flex-row flex-col gap-2 py-3 px-5 border-t border-amber-900/20">
                    <input
                        id={`np-name-${catId}`} 
                        class="name-inp flex-2 font-[DM_Sans] text-sm px-3 py-1.5 border-[1.5px] border-[#e8dbd9] focus:border-[#c4757f] rounded-md bg-white text-[#3a2520] outline-none transition-colors duration-150" 
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.currentTarget.value)}
                        type="text" 
                        placeholder="Nombre del producto" 
                    />
                    <input
                        id={`np-price-${catId}`}  
                        class="price-inp w-full lg:w-25 font-[DM_Sans] text-sm px-3 py-1.5 border-[1.5px] border-[#e8dbd9] focus:border-[#c4757f] rounded-md bg-white text-[#3a2520] outline-none transition-colors duration-150" 
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(parseInt(e.currentTarget.value))}
                        type="number" 
                        placeholder="Precio" 
                        min="0" 
                        step="0.01" 
                    />
                    <button class="btn bg-rose-300/90 hover:text-gray-50 hover:bg-red-900" onClick={(e) => handleAddProduct(catId, newProductName, newProductPrice)}>+ Agregar</button>
                </div>
            </div>
        </div>
    )
}