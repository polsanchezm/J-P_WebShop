import type { ErrorResponse } from '@/lib/axios';
import axios from '@/lib/axios';
import type { Shipping } from '@/models/shipping';
import router from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useShippingStore = defineStore('shipping', () => {
    const shipping = ref<Shipping[]>([]);
    const oneShipping = ref<Shipping | null>(null);

    const shippingCreate = async (shipping: Shipping) => {
        console.log({
            phone: shipping.phone,
            street: shipping.street,
            unit: shipping.unit,
            apartment_number: shipping.apartment_number,
            country: shipping.country,
            city: shipping.city,
            other_instructions: shipping.other_instructions
        });

        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.post<Shipping>(
                `/app/shipping/create`,
                {
                    phone: shipping.phone,
                    street: shipping.street,
                    unit: shipping.unit,
                    apartment_number: shipping.apartment_number,
                    country: shipping.country,
                    city: shipping.city,
                    other_instructions: shipping.other_instructions
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
                    }
                }
            );
            console.log(response);
            console.log(response.data);

            if (response.status == 200) {
                router.push({ name: 'shipping.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el shipping:', errorMessage.response);
        }
    };

    const shippingEdit = async (shipping: Shipping, id: number | null) => {
        console.log(shipping);

        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }

            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.post<Shipping>(
                `/app/shipping/update/${id}`,
                {
                    phone: shipping.phone,
                    street: shipping.street,
                    unit: shipping.unit,
                    apartment_number: shipping.apartment_number,
                    country: shipping.country,
                    city: shipping.city,
                    other_instructions: shipping.other_instructions
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
                    }
                }
            );
            console.log(response);
            console.log(response.data);

            if (response.status == 200) {
                router.push({ name: 'shipping.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al editar el shipping:', errorMessage.response);
        }
    };

    const shippingIndex = async () => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.get('/app/shipping', {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

            console.log(response);
            console.log(response.data);

            if (response.status == 200) {
                shipping.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    const shippingDetail = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }

            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.get(`/app/shipping/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

            // console.log('response detail', response);
            // console.log('data detail', response.data.data);

            if (response.status == 200) {
                oneShipping.value = response.data.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    const shippingDelete = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.delete(`/app/shipping/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

            console.log('response detail', response);
            console.log('data detail', response.data);

            if (response.status == 200) {
                shipping.value = shipping.value.filter((ship) => ship.id !== id);
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    return { shipping, shippingIndex, shippingCreate, shippingDetail, shippingEdit, shippingDelete, oneShipping };
});
