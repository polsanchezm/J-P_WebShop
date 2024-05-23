import { useToast } from '@/components/ui/toast';
import type { Order } from '@/models/order';
import type { OrderDetail } from '@/models/orderDetail';
import router from '@/router';
import { orderService } from '@/services/order/order';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
const { toast } = useToast();

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
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while obtaining orders',
                    description: "There was an error while obtaining the orders. Please try again.",
                });
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
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while obtaining order detail',
                    description: "There was an error while obtaining the order detail. Please try again.",
                });
            }
        }
    };

    const deleteOrder = async (orderId: number, redirect: boolean = false) => {
        try {
            // Desa la resposta de la crida a l'API per eliminar una comanda
            const response = await orderServ.orderDelete(orderId);

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
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while deleting order',
                    description: "There was an error while deleting the order. Please try again.",
                });
            }
        }
    };

    return { userOrders, detailOrder, deleteOrder, orders, oneOrder };
});
