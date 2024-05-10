import type { ProductItem } from '@/models/productItem';
import type { ProductVariant } from '@/models/productVariant';
import router from '@/router';
import { wishlistService } from '@/services/wishlist/wishlist';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlist = ref<ProductItem[]>([]);
    const wishlistServ = wishlistService();

    const wishlistItems = async () => {
        try {
            // Petició per a obtenir els ítems que pertanyen a la wishlist
            const response = await wishlistServ.wishlistItems();

            if (response.status == 200) {
                wishlist.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el wishlist items', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const addItemToWishlist = async (productVariant: ProductVariant) => {
        try {
            // Petició per afegir/crear un nou ítem a la wishlist
            const response = await wishlistServ.addToWishlist(productVariant);

            if (response.status == 200) {
                console.log(response.data);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al crear el wishlist item:', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    return { wishlistItems, addItemToWishlist, wishlist };
});
