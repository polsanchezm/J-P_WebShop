import type { Product } from './product';
import type { ProductVariant } from './productVariant';

export interface ProductItem {
    id: number;
    productVariant: ProductVariant;
    quantity: number;
    wishlistId: number;
}
