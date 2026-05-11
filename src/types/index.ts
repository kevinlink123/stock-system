export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    products: Product[];
}