import axios, { type ErrorResponse } from '@/lib/axios';
import { ref } from 'vue';
import { type Order } from '@/models/order';
import { useVerifyToken } from '@/composables/verifyToken';

export function orderManagementService() {
    const allOrders = ref<Order[]>([]);
    const { verifyToken } = useVerifyToken();

    const Orders = async () => {
        try {
            const userToken = verifyToken();

            // Fa petició per obtenir un llistat de totes les comandes
            const response = await axios.get<Order[]>('/app/orders', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                allOrders.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error en obtenir les ordres', errorMessage.message);
        }
    };


    const deleteOrder = async (orderId: number | null) => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per eliminar una comanda específica
            const response = await axios.delete(`/app/orders/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status === 200) {
                // Actualitza el llistat de comandes
                allOrders.value = allOrders.value.filter((order) => order.id !== orderId);
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error("Error en eliminar l'order", errorMessage.message);
        }
    };

    return { Orders, deleteOrder, allOrders };
}
