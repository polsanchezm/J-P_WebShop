import axios from '@/lib/axios';
import type { AxiosError } from 'axios';
import router from '@/router';
import { type Product } from '@/models/product';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';
import { productService } from '@/services/client/product/product';
const productServ = productService();
export function productManagementService() {
    const { verifyToken } = useVerifyToken();
    const addProduct = async (productData: any) => {
        try {
            const userToken = verifyToken();
            const formData = new FormData();

            formData.append('name', productData.name);
            formData.append('price', productData.price);
            formData.append('description', productData.description);
            formData.append('category_id', productData.categoryId.toString());
            formData.append('image', productData.image);

            // Crida a l'API per crear un nou producte
            const response = await axios.post<Product>('/app/products/create', formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

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
            const userToken = verifyToken();

            // Petició a l'API per eliminar un producte
            const response = await axios.delete(`/app/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                // Porta a la pàgina de tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en eliminar el producte:', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const updateProduct = async (productData: any) => {
        try {
            const userToken = verifyToken();
            const formData = new FormData();

            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('category_id', productData.categoryId.toString());
            formData.append('image', productData.image);
            formData.append('price', productData.price);

            // Crida a l'API per modificar els detalls d'un producte
            const response = await axios.post<Product>(`/app/products/update/${productData.productId}`, formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'content-type': 'multipart/form-data'
                }
            });

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

    const addVariant = async (productVariant: any) => {
        try {
            const userToken = verifyToken();

            // Petició a l'APi per afegir una nova variant d'un producte
            const response = await axios.post<ProductVariant>(
                '/app/products/variants/create',
                {
                    id: productVariant.id,
                    size: productVariant.size,
                    color: productVariant.color,
                    stock: productVariant.stock,
                    product_id: productVariant.productId,
                    quantity: productVariant.quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                }
            );

            if (response.status == 200) {
                console.log(response.data.productVariant);
                
                productServ.productVariants.value.push(response.data.productVariant);
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

    const updateVariant = async (productVariant: any) => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per modificar una variant d'un producte
            const response = await axios.post<ProductVariant>(
                `/app/products/variants/update/${productVariant.id}`,
                {
                    product_id: productVariant.productId,
                    size: productVariant.size,
                    color: productVariant.color,
                    stock: productVariant.stock
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                }
            );

            if (response.status == 200) {
                // Redirigeix a la pàgina de tots els productes
                router.push({ name: 'manager.products.all' });
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
            const userToken = verifyToken();

            // Crida a l'API per eliminar una variant d'un producte
            const response = await axios.delete(`/app/products/variants/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                // Redirigeix a la pàgina de tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error en eliminar la variant:', errorMessage.message);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    return { addProduct, deleteProduct, updateProduct, addVariant, updateVariant, deleteVariant };
}
