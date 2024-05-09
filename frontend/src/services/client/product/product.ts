import axios from '@/lib/axios';
import { type Product } from '@/models/product';

export function productService() {
    const productsIndex = async () => {
        // Petició a l'API per a obtenir tots els productes
        const response = await axios.get<Product[]>('/app/products/');

        return response;
    };

    const productDetail = async (productId: number) => {
        // Crida a l'API per a obtenir el detall i les variants d'un producte
        const response = await axios.get<Product>('/app/products/detail/' + productId);
        return response;
    };

    return { productsIndex, productDetail };
}
