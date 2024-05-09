import axios, { type ErrorResponse } from '@/lib/axios';
import router from '@/router';
import { type Product } from '@/models/product';
import { type ProductVariant } from '@/models/productVariant';
import { useVerifyToken } from '@/composables/verifyToken';

export function productManagementService() {
    const { verifyToken } = useVerifyToken();
    const addProduct = async (productData: any) => {
        try {
            const userToken = verifyToken();
            const formData = new FormData();

            // Crida a l'API per crear un nou producte
            const response = await axios.post<Product>('/app/products/create', formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status == 200) {
                // Porta a la ruta que mostra tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al crear el producte', errorMessage);
        }
    };


    const deleteProduct = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no rep un ID vàlid
                return;
            }
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
            const errorMessage = error as ErrorResponse;
            console.error('Error en eliminar el producte:', errorMessage.message);
        }
    };

    const updateProduct = async (productData: any) => {
        try {
            if (productData.id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no rep un ID vàlid
                return;
            }
          
            const userToken = verifyToken();
            const formData = new FormData();

            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('category_id', productData.categoryId.toString());
            formData.append('image', productData.image);
            formData.append('price', productData.price);

            // Crida a l'API per modificar els detalls d'un producte
            const response = await axios.post<Product>(
                `/app/products/update/${productData.productId}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                }
            );

            if (response.status == 200) {
                // Porta a la ruta que mostra tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al editar el producte:', errorMessage);
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
                // Porta a la pàgina de tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al crear la variant', errorMessage.response);
        }
    };

    const updateVariant = async (productVariant: any) => {
        console.log('service', productVariant);
        try {
            if (productVariant.id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no rep un ID vàlid
                return;
            }

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
            const errorMessage = error as ErrorResponse;
            console.error('Error al editar la variant:', errorMessage.response);
        }
    };


    const deleteVariant = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no repp un ID vàlid
                return;
            }
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
            const errorMessage = error as ErrorResponse;
            console.error('Error en eliminar la variant:', errorMessage.message);
        }
    };

    return { addProduct, deleteProduct, updateProduct, addVariant, updateVariant, deleteVariant };
}
