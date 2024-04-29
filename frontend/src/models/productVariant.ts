export interface ProductVariant {
    id: number;
    product_id: number;
    size: string;
    color: string;
    stock: number | null;
}
