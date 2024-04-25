import { defineStore } from 'pinia';
import axios, { type ErrorResponse } from '@/lib/axios';
import { ref } from 'vue';
import { type ProductItem } from '@/models/productItem';
import { type ProductVariant } from '@/models/productVariant';

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlist = ref<ProductItem[]>([]);

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
            const response = await axios.get<ProductItem[]>('/app/wishlist/items', {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

            if (response.status == 200) {
                const wishlistData = response.data;
                console.log('datas', wishlistData);
                wishlist.value = wishlistData;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el wishlist items', errorMessage.message);
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
            const response = await axios.post<ProductItem>(
                '/app/wishlist/items/create',
                {
                    variant_id: productVariant.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
                    }
                }
            );

            if (response.status == 200) {
                console.log('Added correctly');
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el wishlist item:', errorMessage.response);
        }
    };

    return { wishlistItems, addToWishlist, wishlist };
});
