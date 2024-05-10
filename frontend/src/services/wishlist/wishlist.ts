import axios from '@/lib/axios';
import { type ProductItem } from '@/models/productItem';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';

export function wishlistService() {
    const { verifyToken } = useVerifyToken();

    const wishlistItems = async () => {
        const userToken = verifyToken();

        // Petició per a obtenir els ítems que pertanyen a la wishlist
        const response = await axios.get<ProductItem[]>('/app/wishlist/items', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const addToWishlist = async (productVariant: ProductVariant) => {
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

        return response;
    };

    return { wishlistItems, addToWishlist };
}
