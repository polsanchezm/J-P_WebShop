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
                wishlist.value.push(response.data);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al crear el wishlist item:', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const removeItemFromWishlist = async (wishlistItem: any, variantId: number) => {
        console.log('store item', wishlistItem);

        try {
            const response = await wishlistServ.removeFromWishlist(wishlistItem);

            if (response.status === 200) {
                wishlist.value = wishlist.value.filter((item) => item.variantId !== variantId);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al eliminar el wishlist item:', errorMessage);
            if (errorMessage.response!.status === 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const toggleItemInWishlist = async (productVariant: any, variantId: number) => {
        console.log('toggle variant', productVariant.id);
        console.log('wishlist toggle 1', wishlist.value);
        wishlist.value = wishlist.value.filter((item) => item.variantId === productVariant.id);

        const existingItem = wishlist.value.find((item) => item.variantId === productVariant.id);
        console.log('exiting item', existingItem);
        console.log('wishlist toggle 2', wishlist.value);

        if (existingItem) {
            await removeItemFromWishlist(existingItem, productVariant.variantId);
        } else {
            wishlist.value = wishlist.value.filter((item) => item.variantId === variantId);
            await addItemToWishlist(productVariant);
        }
    };

    return { wishlistItems, addItemToWishlist, toggleItemInWishlist, removeItemFromWishlist, wishlist };
});
