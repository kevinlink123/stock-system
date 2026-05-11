
import { type Product, type Category } from "../types";

const API_URL="http://localhost:4000/api";

export function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('merceria_data') || '[]');
}

export async function getData(): Promise<Category[]> {
    const result = await fetch(`${API_URL}/categories`);
    const response = await result.json();
    const data: Category[] = response.data;
    localStorage.setItem('merceria_data', JSON.stringify(data));
    return data;
}

export function save(data: Category[]) {
    localStorage.setItem('merceria_data', JSON.stringify(data));
}

export async function createCategory(name: string) {
    const result = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    });
}

export async function editCategory(id: number, newName: string) {
    if (!id) {
        console.error(`Índice ${id} inválido`);
        return false;
    }
    const result = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: newName
        })
    });
}

export async function deleteCategory(id: number) {
    if(!id) {
        console.error("No category found!");
        const data = getDataFromLocalStorage();
        return data;
    }

    const result = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
    });

}

export async function addProduct(categoryId: number, newProduct: { name: string, price: number }) {
    const result = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            ...newProduct,
            category_id: categoryId
        })
    });
}


export async function editProduct(categoryId: number, productId: number, newData: { name: string, price: number }) {
    if(!categoryId) {
        console.error(`Category ID ${categoryId} invalid!`);
        return;
    }
    if (!productId) {
        console.error(`Product ID ${productId} invalid`);
        return;
    }

    const result = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newData)
    });
}

export async function deleteProduct(categoryId: number, productId: number) {
    if(!categoryId) {
        console.error(`Category with id ${categoryId} invalid`);
        return;
    }
    if (!productId) {
        console.error(`Product with id ${productId} not found in category with id ${categoryId}`);
        return;
    }

    const result = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
    });
}