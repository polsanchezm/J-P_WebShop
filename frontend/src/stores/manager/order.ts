import { defineStore } from "pinia";
import axios, { type ErrorResponse, type UserApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type Order } from "@/models/order";
import { type OrderDetail } from '@/models/orderDetail';

export const useOrderManageStore = defineStore('orderManagement', () => {
    const allOrders = ref<Order[]>([]);

    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const Orders = async () => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
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
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir les ordres', errorMessage.message);
        }
    };

    

    const deleteOrder = async (orderId: number | null) => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem crida a la api per eliminar l'order
            const response = await axios.delete(`/app/orders/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });
    
            if (response.status === 200) {
                allOrders.value = allOrders.value.filter((order) => order.id !== orderId);
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error("Error en eliminar l'order", errorMessage.message);
        }
    };

    return {Orders, deleteOrder, allOrders}
})