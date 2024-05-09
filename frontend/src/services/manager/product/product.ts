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
                // No hi ha token disponible
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null;
            }

            const tokenObj = JSON.parse(tokenString);

            // Crida a l'API per crear un nou producte
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
                // Porta a la ruta que mostra tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al crear el producte', errorMessage.response);
        }
    };


    const deleteProduct = async (id: number | null) => {
        try {
            if (id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no rep un ID vàlid
                return;
            }
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hi ha token disponible
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null;
            }

            const tokenObj = JSON.parse(tokenString);

            // Petició a l'API per eliminar un producte
            const response = await axios.delete(`/app/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
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


    const updateProduct = async (product: Product) => {
        console.log(product);

        try {
            if (product.id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no rep un ID vàlid
                return;
            }

            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hi ha token disponible
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null;
            }

            const tokenObj = JSON.parse(tokenString);

            // Crida a l'API per modificar els detalls d'un producte
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
                // Porta a la ruta que mostra tots els productes
                router.push({ name: 'manager.products.all' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al editar el producte:', errorMessage);
        }
    };


    const addVariant = async (productVariant: ProductVariant) => {
        console.log(productVariant);
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                console.error('No token found in localStorage.');
                
                // Surt de la funció si no hi ha token
                return null; 
            }

            const tokenObj = JSON.parse(tokenString);

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
                        Authorization: `Bearer ${tokenObj.value}`,
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


    const updateVariant = async (productVariant: ProductVariant) => {
        console.log(productVariant);

        try {
            if (productVariant.id === null) {
                console.log('Received null ID, aborting detail retrieval.');

                // Surt de la funció si no rep un ID vàlid
                return;
            }

            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null
            }

            const tokenObj = JSON.parse(tokenString);

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
                        Authorization: `Bearer ${tokenObj.value}`,
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
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                console.error('No token found in localStorage.');

                // Surt de la funció si no hi ha token
                return null;
            }

            const tokenObj = JSON.parse(tokenString);

            // Crida a l'API per eliminar una variant d'un producte
            const response = await axios.delete(`/app/products/variants/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
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
