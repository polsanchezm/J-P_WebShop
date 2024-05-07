import axios, { type ErrorResponse } from '@/lib/axios';
import router from '@/router';
import { type Product } from '@/models/product';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';

export function productManagementService() {
    const { verifyToken } = useVerifyToken();
    const addProduct = async (productData: any, file: any) => {
        console.log(productData);
        console.log(file);
        try {
            const userToken = verifyToken();
            const formData = new FormData();

            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('category_id', productData.categoryId);
            formData.append('file', file.value);

            // fem una crida a la api
            const response = await axios.post<Product>(
                '/app/products/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status == 200) {
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el producte', errorMessage.response);
        }
    };

    const deleteProduct = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }
            const userToken = verifyToken();


            // fem una crida a la api
            const response = await axios.delete(`/app/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en eliminar el producte:', errorMessage.message);
        }
    };

    const updateProduct = async (product: Product) => {
        console.log(product);

        try {
            if (product.id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }

            const userToken = verifyToken();


            // fem una crida a la api
            const response = await axios.post<Product>(
                `/app/products/update/${product.id}`,
                {
                    name: product.name,
                    description: product.description,
                    image: product.image,
                    category_id: product.categoryId,
                    price: product.price
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                }
            );

            if (response.status == 200) {
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al editar el producte:', errorMessage);
        }
    };

    const addVariant = async (productVariant: ProductVariant) => {
        console.log(productVariant);
        try {
            const userToken = verifyToken();


            // fem una crida a la api
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
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear la variant', errorMessage.response);
        }
    };

    const updateVariant = async (productVariant: ProductVariant) => {
        console.log(productVariant);

        try {
            if (productVariant.id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }

            const userToken = verifyToken();


            // fem una crida a la api
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
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al editar la variant:', errorMessage.response);
        }
    };

    const deleteVariant = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }
            const userToken = verifyToken();


            // fem una crida a la api
            const response = await axios.delete(`/app/products/variants/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en eliminar la variant:', errorMessage.message);
        }
    };

    return { addProduct, deleteProduct, updateProduct, addVariant, updateVariant, deleteVariant };
}
