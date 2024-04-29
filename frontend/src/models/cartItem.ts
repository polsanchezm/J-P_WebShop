export interface CartItem {
    id: number;
    product_id: number;
    size: string;
    color: string;
    stock: number | null;
    quantity: number;
}
