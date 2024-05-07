import axios, { type ErrorResponse } from '@/lib/axios';
import router from '@/router';
import { type Product } from '@/models/product';
import { type ProductVariant } from '@/models/productVariant';

export function productManagementService() {
    const addProduct = async (product: Product) => {
        console.log(product);
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.post<Product>(
                '/app/products/create',
                {
                    category_id: product.categoryId,
                    id: product.id,
                    description: product.description,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`,
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
            console.error('Error al crear el producte', errorMessage.response);
        }
    };

    const deleteProduct = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');
                return;
            }
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.delete(`/app/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
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

            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

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
                        Authorization: `Bearer ${tokenObj.value}`,
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
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

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
                        Authorization: `Bearer ${tokenObj.value}`,
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

            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

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
                        Authorization: `Bearer ${tokenObj.value}`,
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
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.delete(`/app/products/variants/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
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
