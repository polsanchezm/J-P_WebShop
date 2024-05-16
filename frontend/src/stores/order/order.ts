import type { Order } from '@/models/order';
import type { OrderDetail } from '@/models/orderDetail';
import router from '@/router';
import { orderService } from '@/services/order/order';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('order', () => {
    const orders = ref<Order[]>([]);
    const oneOrder = ref<OrderDetail[]>([]);
    const orderServ = orderService();

    const userOrders = async () => {
        try {
            // Desa la resposta de la crida a l'API per obtenir les comandes de l'usuari
            const response = await orderServ.ordersIndex();

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

    const detailOrder = async (orderId: number) => {
        try {
            // Desa la resposta de la crida a l'API per obtenir el detall d'una comanda
            const response = await orderServ.orderDetail(orderId);

            if (response.status == 200) {
                oneOrder.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error("Error en obtenir l'order detail", errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const deleteOrder = async (orderId: number, redirect: boolean = false) => {
        try {
            // Desa la resposta de la crida a l'API per eliminar una comanda
            const response = await orderServ.orderDelete(orderId);

            console.log(response);

            if (response.status === 200) {
                if (redirect) {
                    // Portar a la pàgina de comandes
                    router.push({ name: 'orders.all' });
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

    return { userOrders, detailOrder, deleteOrder, orders, oneOrder };
});
