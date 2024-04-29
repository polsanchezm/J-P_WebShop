import type { ProductVariant } from './productVariant';

export interface OrderDetail {
    id: number;
    quantity: number;
    orderId: number;
    productVariant: ProductVariant;
}
