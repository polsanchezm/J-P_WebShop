import type { Product } from "./product";
import type { ProductVariant } from "./productVariant";

export interface ProductItem {
    id: number;
    product: Product;
    productVariant: ProductVariant;
    quantity: number;
    wishlistId: number;
}
