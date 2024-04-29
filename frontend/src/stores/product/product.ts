import { defineStore } from 'pinia';
import axios, { type ErrorResponse, type UserApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type Product } from '@/models/product';
import { type ProductVariant } from '@/models/productVariant';

export const useProductStore = defineStore('product', () => {
    const allProductsArray = ref<Product[]>([]);
    const oneProductDetail = ref<Product | null>(null);
    const productVariants = ref<ProductVariant[]>([]);

    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const allProducts = async () => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.get<Product[]>('/app/products/', {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

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
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.get<Product>('/app/products/detail/' + productId, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

            if (response.status == 200) {
                oneProductDetail.value = response.data;
                const variantResponse = await axios.get<ProductVariant[]>('/app/products/variants/' + productId, {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
                    }
                });
                if (response.status == 200) {
                    productVariants.value = variantResponse.data;
                }
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail del producte', errorMessage.message);
        }
    };

    return { allProducts, oneProduct, allProductsArray, oneProductDetail, productVariants };
});
