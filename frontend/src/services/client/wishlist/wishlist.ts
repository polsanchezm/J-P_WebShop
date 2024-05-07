import axios, { type ErrorResponse } from '@/lib/axios';
import { ref } from 'vue';
import { type ProductItem } from '@/models/productItem';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';

export function wishlistService() {
    const wishlist = ref<ProductItem[]>([]);
    const { verifyToken } = useVerifyToken();

    const wishlistItems = async () => {
        try {
            const userToken = verifyToken();

            // fem una crida a la api
            const response = await axios.get<ProductItem[]>('/app/wishlist/items', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                wishlist.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el wishlist items', errorMessage.message);
        }
    };

    const addToWishlist = async (productVariant: ProductVariant) => {
        try {
            const userToken = verifyToken();

            // fem una crida a la api
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
                console.log(response.data.message);
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el wishlist item:', errorMessage.response);
        }
    };

    return { wishlistItems, addToWishlist, wishlist };
}
