import type { Product } from '@/models/product';
import type { ProductVariant } from '@/models/productVariant';
import router from '@/router';
import { productService } from '@/services/client/product/product';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([]);
    const productDetail = ref<Product | null>(null);
    const productVariants = ref<ProductVariant[]>([]);
    const productServ = productService();

    const allProducts = async () => {
        try {
            const response = await productServ.productsIndex();

            if (response.status == 200) {
                products.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir els productes', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const oneProduct = async (productId: number) => {
        try {
            const response = await productServ.productDetail(productId);

            if (response.status == 200) {
                // Detall general d'un producte
                productDetail.value = response.data;

                // Les seves variants com color, mida,...
                productVariants.value = response.data.productVariants;
                // productVariants.value = response.data.productVariants.filter((variant) => variant.id !== variantId);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el detail del producte', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    return { allProducts, oneProduct, products, productDetail, productVariants };
});
