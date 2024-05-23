import { useToast } from '@/components/ui/toast';
import type { ProductItem } from '@/models/productItem';
import type { ProductVariant } from '@/models/productVariant';
import router from '@/router';
import { wishlistService } from '@/services/wishlist/wishlist';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
const { toast } = useToast();

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlist = ref<ProductItem[]>([]);
    const wishlistServ = wishlistService();

    const wishlistItems = async () => {
        try {
            // Recull la resposta de la crida per a obtenir els ítems/productes de la wishlist
            const response = await wishlistServ.wishlistItems();

            if (response.status == 200) {
                wishlist.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el wishlist items', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while obtaining wishlist items',
                    description: "There was an error while obtaining the wishlist items. Please try again.",
                });
            }
        }
    };

    const addItemToWishlist = async (productVariant: ProductVariant) => {
        try {
            // Recull la resposta de la petició per afegir un nou ítem/producte a la wishlist
            const response = await wishlistServ.addToWishlist(productVariant);
            if (response.status == 200) {
                wishlist.value.push(response.data);
                toast({
                    title: 'Product added to the wishlist!',
                    description: "The product was added to the wishlist succesfully.",
                });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al crear el wishlist item:', errorMessage);
            if (errorMessage.response!.status == 409) {
                toast({
                    title: 'Product already in the wishlist!',
                    description: "The product is already in the wishlist.",
                });
            }
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const removeItemFromWishlist = async (wishlistItem: any, variantId: number) => {
        try {
            // Resposta de la petició a l'API per eliminar un producte de la wishlist
            const response = await wishlistServ.removeFromWishlist(wishlistItem);

            if (response.status === 200) {
                // Actualitza la wishlist i la pàgina (reactivitat)
                wishlist.value = wishlist.value.filter((item) => item.variantId !== variantId);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al eliminar el wishlist item:', errorMessage);
            if (errorMessage.response!.status === 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while deleting wishlist item',
                    description: "There was an error while deleting the wishlist item. Please try again.",
                });
            }
        }
    };

    return { wishlistItems, addItemToWishlist, removeItemFromWishlist, wishlist };
});
