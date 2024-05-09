import axios, { type ErrorResponse } from '@/lib/axios';
import { ref } from 'vue';
import { type Product } from '@/models/product';
import { type ProductVariant } from '@/models/productVariant';

export function productService() {
    const allProductsArray = ref<Product[]>([]);
    const oneProductDetail = ref<Product | null>(null);
    const productVariants = ref<ProductVariant[]>([]);

    const allProducts = async () => {
        try {
            // Petició a l'API per a obtenir tots els productes
            const response = await axios.get<Product[]>('/app/products/');

            if (response.status == 200) {
                allProductsArray.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error en obtenir els productes', errorMessage.message);
        }
    };

    
    const oneProduct = async (productId: number) => {
        try {
            // Crida a l'API per a obtenir el detall i les variants d'un producte
            const response = await axios.get<Product>('/app/products/detail/' + productId);
            console.log(response.data);
            if (response.status == 200) {
                // Detall general d'un producte
                oneProductDetail.value = response.data;
                
                // Les seves variants com color, mida,...
                productVariants.value = response.data.productVariants;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error en obtenir el detail del producte', errorMessage.message);
        }
    };

    return { allProducts, oneProduct, allProductsArray, oneProductDetail, productVariants };
}
