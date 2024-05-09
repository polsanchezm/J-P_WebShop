import axios from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type Order } from '@/models/order';
import { type OrderDetail } from '@/models/orderDetail';
import { useVerifyToken } from '@/composables/verifyToken';
import type { AxiosError } from 'axios';

export function orderService() {
    const orders = ref<Order[]>([]);
    const orderDetail = ref<OrderDetail[]>([]);
    const { verifyToken } = useVerifyToken();

    const userOrders = async () => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per obtenir les comandes de l'usuari
            const response = await axios.get<Order[]>('/app/orders/', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                orders.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir les ordres', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const userOrderDetail = async (orderId: number | null) => {
        try {
            const userToken = verifyToken();

            // Petició a l'API per obtenir els detalls d'una comanda específica de l'usuari
            const response = await axios.get<OrderDetail[]>(`/app/orders/details/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                orderDetail.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error("Error en obtenir l'order detail", errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const deleteUserOrder = async (orderId: number | null, redirect: boolean = false) => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per eliminar una comanda específica
            const response = await axios.delete(`/app/orders/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status === 200) {
                if (redirect) {
                    // Portar a la pàgina de comandes
                    router.push({ name: 'user.orders.all' });
                } else {
                    // Actualitzar la pàgina de comandes
                    orders.value = orders.value.filter((order) => order.id !== orderId);
                }
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error("Error en eliminar l'order", errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    return { userOrders, userOrderDetail, deleteUserOrder, orders, orderDetail };
}
