import axios from '@/lib/axios';
import type { AxiosError } from 'axios';
import { ref } from 'vue';
import { type ProductItem } from '@/models/productItem';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';
import router from '@/router';

export function wishlistService() {
    const wishlist = ref<ProductItem[]>([]);
    const { verifyToken } = useVerifyToken();

    const wishlistItems = async () => {
        try {
            const userToken = verifyToken();

            // Petició per a obtenir els ítems que pertanyen a la wishlist
            const response = await axios.get<ProductItem[]>('/app/wishlist/items', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

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

    const addToWishlist = async (productVariant: ProductVariant) => {
        try {
            const userToken = verifyToken();

            // Petició per afegir/crear un nou ítem a la wishlist
            const response = await axios.post<ProductItem>(
                '/app/wishlist/items/create',
                {
                    variant_id: productVariant.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

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

    return { wishlistItems, addToWishlist, wishlist };
}
