
import { type Product, type Category } from "../types";


export function getData(): Category[] {
    return JSON.parse(localStorage.getItem('merceria_data') || '[]');
}

export function save(data: Category[]) {
  localStorage.setItem('merceria_data', JSON.stringify(data));
}

export function createCategory(name: string) {
    const oldData = getData();
    oldData.push({ name, products: [] });
    save(oldData);
    return oldData;
}

export function editCategory(id: number, newName: string) {
    const data = getData();

    if (id < 0 || id >= data.length) {
        console.error(`Índice ${id} inválido`);
        return false;
    }
    
    const newData = data.map((category, index) => {
        return index === id ? {...category, name: newName} : category;
    });
    save(newData);
    return newData;
}

export function deleteCategory(id: number) {
    const data = getData();

    if(!id) {
        console.log("No category found!");
        return data;
    }

    const newData = data.filter((_, index) => index !== id);
    save(newData);
    return newData;
}

export function addProduct(categoryId: number, newProduct: Product) {
    const oldData = getData();
    oldData[categoryId].products.push(newProduct);
    save(oldData);
    return oldData;
}


export function editProduct(categoryId: number, productId: number, newData: { name: string, price: number }) {
    const oldData = getData();

    if(!oldData[categoryId]) {
        console.error(`Category with id ${categoryId} not found`);
        return;
    }
    if (!oldData[categoryId].products[productId]) {
        console.error(`Product with id ${productId} not found in category with id ${categoryId}`);
        return;
    }

    const updatedData = oldData.map((category, i) => 
        i === categoryId 
            ? {
                ...category,
                products: category.products.map((product, j) =>
                    j === productId
                        ? { ...product, ...newData }  // ← Spread correcto aquí
                        : product
                )
              }
            : category
    );
    save(updatedData);
    return updatedData;
}

export function deleteProduct(categoryId: number, productId: number) {
    const oldData = getData();

    if(!oldData[categoryId]) {
        console.error(`Category with id ${categoryId} not found`);
        return oldData;
    }
    if (!oldData[categoryId].products[productId]) {
        console.error(`Product with id ${productId} not found in category with id ${categoryId}`);
        return oldData;
    }

    const newData = oldData.map((category, index) => 
    index === categoryId
        ? {
            ...category,
            products: category.products.filter((_, productIndex) => productIndex !== productId)
        }
        : category
    );
    save(newData);
    return newData;
}