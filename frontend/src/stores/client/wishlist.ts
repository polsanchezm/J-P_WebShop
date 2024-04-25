import { defineStore } from "pinia";
import axios, { type ErrorResponse, type UserApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type WishlistItem } from "@/models/wishlistItem";
import { type ProductVariant } from "@/models/productVariant";

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlist = ref<WishlistItem[]>([]);

    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const wishlistItems = async () => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.get<WishlistItem[]>('/app/wishlist/items', {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });
            
            if (response.status == 200) {
                wishlist.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error("Error en obtenir el wishlist items", errorMessage.message);
        }
    };


    const addToWishlist = async (productVariant: ProductVariant) => {
        

        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.post<WishlistItem>('/app/wishlist/items/create',
                {
                    variant_id: productVariant.id,
                    // quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
                    }
                }
            );

            if (response.status == 200) {
                console.log('Added successfull')
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el wishlist item:', errorMessage.response);
        }
    };

    return {wishlistItems, addToWishlist, wishlist}
})