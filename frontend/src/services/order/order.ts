import axios from '@/lib/axios';
import { type Order } from '@/models/order';
import { type OrderDetail } from '@/models/orderDetail';
import { useVerifyToken } from '@/composables/verifyToken';

export function orderService() {
    const { verifyToken } = useVerifyToken();

    const ordersIndex = async () => {
        const userToken = verifyToken();

        // Crida a l'API per obtenir les comandes de l'usuari
        const response = await axios.get<Order[]>('/app/orders/', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return response;
    };

    const orderDetail = async (orderId: number) => {
        const userToken = verifyToken();

        // Petició a l'API per obtenir els detalls d'una comanda específica de l'usuari
        const response = await axios.get<OrderDetail[]>(`/app/orders/details/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const orderDelete = async (orderId: number) => {
        const userToken = verifyToken();

        // Crida a l'API per eliminar una comanda específica
        const response = await axios.delete(`/app/orders/delete/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    return { ordersIndex, orderDetail, orderDelete };
}
