import type { Product } from '@/models/product';
import type { ProductVariant } from '@/models/productVariant';
import router from '@/router';
import { productService } from '@/services/product/product';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([]);
    const pagination = ref({
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: null,
        prevPageUrl: null,
        perPage: 15,
        total: 0
    });

    const productDetail = ref<Product | null>(null);
    const productVariants = ref<ProductVariant[]>([]);
    const productServ = productService();

    const allProducts = async (limit: number, page: number) => {
        try {
            const response = await productServ.productsIndex(limit, page);

            if (response.status == 200) {
                products.value = response.data.products;
                console.log(response.data.pagination);
                
                pagination.value = {
                    currentPage: response.data.pagination.currentPage,
                    lastPage: response.data.pagination.lastPage,
                    nextPageUrl: response.data.pagination.nextPageUrl,
                    prevPageUrl: response.data.pagination.prevPageUrl,
                    perPage: response.data.pagination.perPage,
                    total: response.data.pagination.total
                };
                console.log(pagination.value);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir els productes', errorMessage);
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

    const addProduct = async (productData: any) => {
        try {
            const response = await productServ.addProduct(productData);

            if (response.status == 200) {
                // Porta a la ruta que mostra tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el producte', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await productServ.deleteProduct(id);

            if (response.status == 200) {
                // Porta a la pàgina de tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en eliminar el producte:', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const updateProduct = async (productData: any) => {
        try {
            const response = await productServ.updateProduct(productData);

            if (response.status == 200) {
                // Porta a la ruta que mostra el detall del producte
                router.push({ name: 'manager.products.detail', params: { id: productData.id } });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al editar el producte:', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const addVariant = async (productVariant: ProductVariant) => {
        try {
            const response = await productServ.addVariant(productVariant);

            if (response.status == 200) {
                console.log('response variant', response.data.productVariant);

                productVariants.value.push(response.data.productVariant);
                // productServ.productVariants.value = productServ.productVariants.value.filter((variant) => variant.id !== productVariant.id);

                // Porta a la pàgina del detall del producte
                router.push({ name: 'manager.products.detail', params: { id: productVariant.productId } });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al crear la variant', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const updateVariant = async (productVariant: ProductVariant) => {
        console.log('store', productVariant);

        try {
            const response = await productServ.updateVariant(productVariant);

            if (response.status == 200) {
                // Redirigeix a la pàgina de tots els productes
                console.log('response', response);

                // router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al editar la variant:', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const deleteVariant = async (id: number) => {
        try {
            const response = await productServ.deleteVariant(id);

            if (response.status == 200) {
                // Redirigeix a la pàgina de tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en eliminar la variant:', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    return { pagination, allProducts, oneProduct, products, productDetail, productVariants, addProduct, deleteProduct, updateProduct, addVariant, updateVariant, deleteVariant };
});
