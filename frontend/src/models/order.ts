import type { OrderDetail } from './orderDetail';

export interface Order {
    id: number;
    userId: number;
    createdAt: Date;
    orderDetails: OrderDetail;
}
