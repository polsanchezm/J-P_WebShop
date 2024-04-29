import type { OrderDetail } from './orderDetail';

export interface Order {
    id: number;
    userId: number;
    orderDate: Date;
    orderDetails: OrderDetail;
}
