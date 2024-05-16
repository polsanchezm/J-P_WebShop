import type { Shipping } from '@/models/shipping';
import router from '@/router';
import { shippingService } from '@/services/shipping/shipping';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useShippingStore = defineStore('shipping', () => {
    const shipping = ref<Shipping[]>([]);
    const oneShipping = ref<Shipping | null>(null);
    const shippinServ = shippingService();

    const createShipping = async (shipping: Shipping) => {
        console.log('store', shipping);

        try {
            // Resposta obtinguda de la petició per crear un nou dades d'enviament
            const response = await shippinServ.shippingCreate(shipping);

            if (response.status == 200) {
                // Redirigeix a la ruta de les dades d'enviament de l'usuari loguejat
                router.push({ name: 'shipping.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al crear el shipping:', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const editShipping = async (shipping: Shipping) => {
        try {
            // Desa la resposta que s'obté de la crida per editar un dades d'enviament
            const response = await shippinServ.shippingEdit(shipping);

            if (response.status == 200) {
                // Redirigeix a la ruta de les dades d'enviament de l'usuari loguejat
                router.push({ name: 'shipping.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al editar el shipping:', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const userShippings = async () => {
        try {
            // Obté la resposta de la petició per obtenir les dades d'enviament de l'usuari
            const response = await shippinServ.shippingIndex();

            if (response.status == 200) {
                shipping.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el detail:', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const detailShipping = async (id: number) => {
        try {
            // Desa la resposta de la petició a l'API per obtenir el detall d'un dades d'enviament
            const response = await shippinServ.shippingDetail(id);

            if (response.status == 200) {
                oneShipping.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el detail:', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const deleteShipping = async (id: number) => {
        try {
            // Resposta obtinguda de de la crida a l'API per eliminar un dades d'enviament
            const response = await shippinServ.shippingDelete(id);

            if (response.status == 200) {
                // Actualitza el llistat i la pàgina de dades d'enviament de l'usuari
                shipping.value = shipping.value.filter((ship) => ship.id !== id);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el detail:', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    return { shipping, oneShipping, createShipping, editShipping, userShippings, detailShipping, deleteShipping };
});
