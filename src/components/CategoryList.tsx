import { useEffect, useRef, useState } from "preact/hooks"
import { addProduct, deleteCategory, deleteProduct, getData } from "../scripts/localStorage";
import type { Category } from "../types";
import CategoryContainer from "./CategoryContainer";
import {  openEditCategoryModal, openEditProductModal } from "../scripts/eventBus";

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const data = getData();
        setCategories([...data]);
    }, []);

    const handleAddProduct = (catId: number, newProductName: string, newProductPrice: number) => {
        console.log(catId);
        if (!newProductName || !newProductPrice) {
            alert("Tenes que setear el nombre y el precio!");
            return;
        }

        try {
            // TODO: Reeplace with api call to store value on DB
            const newData = addProduct(catId, {
                name: newProductName,
                price: newProductPrice
            });
            alert("Producto Agregado a la lista!");
            setCategories([...newData]);
        } catch(err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = (catId: number) => {
        if(!confirm(`¿Eliminar la categoría "${categories[catId].name}" y todos sus productos?`)) return;
        const newData = deleteCategory(catId);
        setCategories([...newData]);
    }

    const handleDeleteProduct = (catId: number, prodId: number) => {
        if(!confirm(`¿Eliminar el producto "${categories[catId].products[prodId].name}"?`)) return;
        const newData = deleteProduct(catId, prodId);
        setCategories([...newData]);
    }
    
    return (
        <div class="categories-container">
            {categories.map((cat, ci) => 
                <CategoryContainer 
                    category={cat}
                    catId={ci}
                    handleAddProduct={handleAddProduct}
                    handleDeleteCategory={handleDeleteCategory}
                    hanldeEditCategory={openEditCategoryModal}
                    handleDeleteProduct={handleDeleteProduct}
                    handleEditProduct={openEditProductModal}
                />
            )}
        </div>
    )
}