import { useVerifyToken } from '@/composables/verifyToken';
import axios from '@/lib/axios';
import type { Shipping } from '@/models/shipping';

export function shippingService() {
    const { verifyToken } = useVerifyToken();

    const shippingCreate = async (shipping: Shipping) => {
        console.log('service', shipping);

        const userToken = verifyToken();

        // Petició a l'API per crear un dades d'enviament nou de l'usuari loguejat
        const response = await axios.post<Shipping>(
            '/app/shipping/create',
            {
                phone: shipping.phone,
                street: shipping.street,
                unit: shipping.unit,
                apartment_number: shipping.apartmentNumber,
                country: shipping.country,
                city: shipping.city,
                other_instructions: shipping?.otherInstructions
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        return response;
    };

    const shippingEdit = async (shipping: Shipping) => {
        const userToken = verifyToken();

        // Crida a l'API per editar un dades d'enviament específic
        const response = await axios.post<Shipping>(
            `/app/shipping/update/${shipping.id}`,
            {
                phone: shipping.phone,
                street: shipping.street,
                unit: shipping.unit,
                apartment_number: shipping.apartmentNumber,
                country: shipping.country,
                city: shipping.city,
                other_instructions: shipping.otherInstructions
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        return response;
    };

    const shippingIndex = async () => {
        const userToken = verifyToken();

        // Crida a l'API per obtenir les dades d'enviament de l'usuari
        const response = await axios.get('/app/shipping', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const shippingDetail = async (id: number) => {
        const userToken = verifyToken();

        // Petició a l'API per obtenir el detall d'un dades d'enviament
        const response = await axios.get(`/app/shipping/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return response;
    };

    const shippingDelete = async (id: number) => {
        const userToken = verifyToken();

        // Petició per eliminar un dades d'enviament
        const response = await axios.delete(`/app/shipping/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    return { shippingIndex, shippingCreate, shippingDetail, shippingEdit, shippingDelete };
}
