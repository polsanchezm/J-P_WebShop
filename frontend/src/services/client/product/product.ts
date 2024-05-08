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
            // fem una crida a la api
            const response = await axios.get<Product[]>('/app/products/');

            if (response.status == 200) {
                allProductsArray.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir els productes', errorMessage.message);
        }
    };

    const oneProduct = async (productId: number) => {
        try {
            // fem una crida a la api
            const response = await axios.get<Product>('/app/products/detail/' + productId);
            // console.log(response.data);
            if (response.status == 200) {
                oneProductDetail.value = response.data;
                productVariants.value = response.data.productVariants;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail del producte', errorMessage.message);
        }
    };

    return { allProducts, oneProduct, allProductsArray, oneProductDetail, productVariants };
}
