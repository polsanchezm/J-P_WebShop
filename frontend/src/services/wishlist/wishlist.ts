import axios from '@/lib/axios';
import { type ProductItem } from '@/models/productItem';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';

export function wishlistService() {
    const { verifyToken } = useVerifyToken();

    const wishlistItems = async () => {
        const userToken = verifyToken();

        // Petició per a obtenir els productes que pertanyen a la wishlist de l'usuari
        const response = await axios.get<ProductItem[]>('/app/wishlist/items', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const addToWishlist = async (productVariant: ProductVariant) => {
        const userToken = verifyToken();

        // Petició per afegir/crear un nou producte a la wishlist de l'usuari
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

        return response;
    };

    const removeFromWishlist = async (wishlistItem: any) => {
        const userToken = verifyToken();

        console.log('service item', wishlistItem);

        // Petició per eliminar un nou producte a la wishlist de l'usuari
        const response = await axios.delete<ProductItem>(
            `/app/wishlist/items/delete/${wishlistItem.id}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        return response;
    };

    return { wishlistItems, addToWishlist, removeFromWishlist };
}
