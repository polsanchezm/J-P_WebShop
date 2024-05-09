import { useVerifyToken } from '@/composables/verifyToken';
import type { ErrorResponse } from '@/lib/axios';
import axios from '@/lib/axios';
import type { Shipping } from '@/models/shipping';
import router from '@/router';
import { ref } from 'vue';

export function shippingService() {
    const shipping = ref<Shipping[]>([]);
    const oneShipping = ref<Shipping | null>(null);
    const { verifyToken } = useVerifyToken();

    const shippingCreate = async (shipping: Shipping) => {
        try {
            const userToken = verifyToken();

            /* 
            Petició a l'API per crear un dades d'enviament nou
            de l'usuari loguejat
            */
            const response = await axios.post<Shipping>(
                `/app/shipping/create`,
                {
                    phone: shipping.phone,
                    street: shipping.street,
                    unit: shipping.unit,
                    apartment_number: shipping.apartmentNumber,
                    country: shipping.country,
                    city: shipping.city,
                    other_instructions: shipping.otherInstructions
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

            if (response.status == 200) {
                /* 
                Redirigeix a la ruta de les dades d'enviament 
                de l'usuari loguejat 
                */
                router.push({ name: 'shipping.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al crear el shipping:', errorMessage.response);
        }
    };


    const shippingEdit = async (shipping: Shipping, id: number | null) => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per editar un dades d'enviament específic
            const response = await axios.post<Shipping>(
                `/app/shipping/update/${id}`,
                {
                    phone: shipping.phone,
                    street: shipping.street,
                    unit: shipping.unit,
                    apartment_number: shipping.apartmentNumber,
                    country: shipping.country,
                    city: shipping.city,
                    other_instructions: shipping.otherInstructions
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

            if (response.status == 200) {
                /* 
                Redirigeix a la ruta de les dades d'enviament 
                de l'usuari loguejat 
                */
                router.push({ name: 'shipping.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al editar el shipping:', errorMessage.response);
        }
    };


    const shippingIndex = async () => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per obtenir les dades d'enviament de l'usuari
            const response = await axios.get('/app/shipping', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                shipping.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    
    const shippingDetail = async (id: number | null) => {
        try {
            const userToken = verifyToken();

            // Petició a l'API per obtenir el detall d'un dades d'enviament
            const response = await axios.get(`/app/shipping/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                oneShipping.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };


    const shippingDelete = async (id: number | null) => {
        try {
            const userToken = verifyToken();

            // Petició per eliminar un dades d'enviament
            const response = await axios.delete(`/app/shipping/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                // Actualitza el llistat de dades d'enviament de l'usuari
                shipping.value = shipping.value.filter((ship) => ship.id !== id);
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    return { shipping, shippingIndex, shippingCreate, shippingDetail, shippingEdit, shippingDelete, oneShipping };
}
