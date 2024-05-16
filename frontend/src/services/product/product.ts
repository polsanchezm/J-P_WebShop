import { useVerifyToken } from '@/composables/verifyToken';
import axios from '@/lib/axios';
import { type Product } from '@/models/product';
import type { ProductVariant } from '@/models/productVariant';

export function productService() {
    const { verifyToken } = useVerifyToken();

    const productsIndex = async (limit: number, page: number) => {
        // Petició a l'API per a obtenir tots els productes
        const response = await axios.get<Product[]>(`/app/products?limit=${limit}&page=${page}`);
        return response;
    };

    const productDetail = async (productId: number) => {
        // Crida a l'API per a obtenir el detall i les variants d'un producte
        const response = await axios.get<Product>(`/app/products/detail/${productId}`);
        return response;
    };

    const searchProducts = async (params: any) => {
        const { search } = params;
        const response = await axios.get(`/app/search/${search}`);
        return response;
    };

    const addProduct = async (productData: any) => {
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

        return response;
    };

    const deleteProduct = async (id: number) => {
        const userToken = verifyToken();

        // Petició a l'API per eliminar un producte
        const response = await axios.delete(`/app/products/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const updateProduct = async (productData: any) => {
        const userToken = verifyToken();
        const formData = new FormData();

        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('category_id', productData.categoryId.toString());
        formData.append('image', productData.image);
        formData.append('price', productData.price);

        // Crida a l'API per modificar els detalls d'un producte específic
        const response = await axios.post<Product>(`/app/products/update/${productData.productId}`, formData, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'content-type': 'multipart/form-data'
            }
        });

        return response;
    };

    const addVariant = async (productVariant: ProductVariant) => {
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

        return response;
    };

    const updateVariant = async (productVariant: ProductVariant) => {
        const userToken = verifyToken();

        console.log('service', productVariant);

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

        return response;
    };

    const deleteVariant = async (id: number) => {
        const userToken = verifyToken();

        // Crida a l'API per eliminar una variant d'un producte
        const response = await axios.delete(`/app/products/variants/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    return { productsIndex, productDetail, addProduct, deleteProduct, updateProduct, addVariant, updateVariant, deleteVariant, searchProducts };
}
