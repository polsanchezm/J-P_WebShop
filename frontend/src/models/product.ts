import type { ProductVariant } from './productVariant';

export interface Product {
    categoryId: number;
    id: number;
    description: string;
    image: string;
    name: string;
    price: string;
    productVariants: ProductVariant[];
    quantity: number;
    wishlistId: number;
}