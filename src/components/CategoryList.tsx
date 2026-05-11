import { useEffect, useRef, useState } from "preact/hooks"
import { addProduct, deleteCategory, deleteProduct, getData } from "../scripts/localStorage";
import type { Category } from "../types";
import CategoryContainer from "./CategoryContainer";
import {  openEditCategoryModal, openEditProductModal } from "../scripts/eventBus";

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const data = getData().then((data) => {
            setCategories([...data]);
        });
    }, []);

    const handleAddProduct = async (catId: number, newProductName: string, newProductPrice: number) => {
        if (!newProductName || !newProductPrice) {
            alert("Tenes que setear el nombre y el precio!");
            return;
        }

        try {
            await addProduct(catId, {
                name: newProductName,
                price: newProductPrice
            });
            alert("Producto Agregado a la lista!");
            // TODO: Create logic to add the newly created product to localstorage data insted of reloading the page
            window.location.reload();
            // setCategories([...newData]);
        } catch(err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (catId: number) => {
        const category = categories.find(cat => cat.id === catId);
        if(!category) return;
        if(!confirm(`¿Eliminar la categoría "${category.name}" y todos sus productos?`)) return;
        try {
            await deleteCategory(catId);
            window.location.reload();
        } catch(err) {
            console.error(err);
        }
    }

    const handleDeleteProduct = async (catId: number, prodId: number) => {
        const category = categories.find(cat => cat.id === catId);
        const product = category?.products.find(product => product.id === prodId);
        if(!category || !product) return;
        if(!confirm(`¿Eliminar el producto "${product.name}"?`)) return;
        try {
            await deleteProduct(catId, prodId);
            window.location.reload();
        } catch(err) {
            console.error(err);
        }
    }
    
    return (
        <div class="categories-container">
            {categories.map((cat) => 
                <CategoryContainer 
                    category={cat}
                    catId={cat.id}
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