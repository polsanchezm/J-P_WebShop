import type { Product } from '@/models/product';
import type { Pagination, ProductsResponse } from '@/models/apiResponse';
import type { ProductVariant } from '@/models/productVariant';
import router from '@/router';
import { productService } from '@/services/product/product';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([]);
    const pagination = ref<Pagination>({
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
                const data: ProductsResponse = response.data;
                products.value = data.products;
                pagination.value = data.pagination;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir els productes', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while obtaining products',
                    description: "There was an error while obtaining the products. Please try again.",
                });
            }
        }
    };

    const oneProduct = async (productId: number) => {
        try {
            // Desa la resposta de la petició a l'API per obtenir el detall d'un producte
            const response = await productServ.productDetail(productId);

            if (response.status == 200) {
                // Detall general d'un producte
                productDetail.value = response.data;

                // Les seves variants com color, mida,...
                productVariants.value = response.data.productVariants;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en obtenir el detail del producte', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while obtaining product detail',
                    description: "There was an error while obtaining the product detail. Please try again.",
                });
            }
        }
    };

    const addProduct = async (productData: any) => {
        try {
            // Desa la resposta de la petició per afegir un producte
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
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while creating the product',
                    description: "There was an error while creating the product. Please try again.",
                });
            }
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            // Obté la resposta de la petició per eliminar un producte específic
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
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while deleting the product',
                    description: "There was an error while deleting the product. Please try again.",
                });
            }
        }
    };

    const updateProduct = async (productData: any) => {
        try {
            // Obté la resposta de la crida per actualitzar un producte
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
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while updating the product',
                    description: "There was an error while updating the product. Please try again.",
                });
            }
        }
    };

    const addVariant = async (productVariant: ProductVariant) => {
        try {
            // Obté la resposta de la crida a l'API per afegir/crear una variant
            const response = await productServ.addVariant(productVariant);

            if (response.status == 200) {
                // Afegeix la nova variant a l'array de variants de producte
                productVariants.value.push(response.data.productVariant);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al crear la variant', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while creating the product variant',
                    description: "There was an error while creating the product variant. Please try again.",
                });
            }
        }
    };

    const updateVariant = async (productVariant: ProductVariant) => {
        try {
            // Resposta obtinguda de la crida a l'APi per actualitzar una variant
            const response = await productServ.updateVariant(productVariant);
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al editar la variant:', errorMessage.response);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while updating the product variant',
                    description: "There was an error while updating the product variant. Please try again.",
                });
            }
        }
    };

    const deleteVariant = async (productVariant: ProductVariant) => {
        try {
            // Resposta obtinguda de la crida per eliminar una variant de producte
            const response = await productServ.deleteVariant(productVariant.id);

            if (response.status == 200) {
                productVariants.value = productVariants.value.filter(variant => variant.id !== productVariant.id);
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en eliminar la variant:', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while deleting the product variant',
                    description: "There was an error while deleting the product variant. Please try again.",
                });
            }
        }
    };

    const searchProducts = async (params: any) => {
        try {
            const response = await productServ.searchProducts(params);

            if (response.status == 200) {
                products.value = response.data.products;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en eliminar la variant:', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
            if (errorMessage.response!.status == 500) {
                toast({
                    title: 'Error while searching the products',
                    description: "There was an error while searching the products. Please try again.",
                });
            }
        }
    };

    return { searchProducts, pagination, allProducts, oneProduct, products, productDetail, productVariants, addProduct, deleteProduct, updateProduct, addVariant, updateVariant, deleteVariant };
});
