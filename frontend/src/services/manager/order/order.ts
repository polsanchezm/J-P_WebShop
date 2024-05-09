import axios, { type ErrorResponse } from '@/lib/axios';
import { ref } from 'vue';
import { type Order } from '@/models/order';

export function orderManagementService() {
    const allOrders = ref<Order[]>([]);

    const Orders = async () => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hi ha token disponible
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null;
            }

            const tokenObj = JSON.parse(tokenString);

            // Fa petició per obtenir un llistat de totes les comandes
            const response = await axios.get<Order[]>('/app/orders', {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
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
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hi ha token disponible
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null;
            }

            const tokenObj = JSON.parse(tokenString);

            // Crida a l'API per eliminar una comanda específica
            const response = await axios.delete(`/app/orders/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
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
