export interface ProductVariant {
    id: number;
    size: string;
    color: string;
    stock: number | null;
    productId: number;
    quantity: number;
    productVariant: any;
}
