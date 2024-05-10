import type { Product } from './product';
import type { ProductVariant } from './productVariant';

export interface ProductItem {
    id: number;
    product: Product;
    productVariant: ProductVariant;
    variantId: number;
    quantity: number;
    wishlistId: number;
}
