import axios from '@/lib/axios';
import router from '@/router';
import { useVerifyToken } from '@/composables/verifyToken';

export function cartService() {
    const { verifyToken } = useVerifyToken();

    const initiatePayment = async (cartItems: any) => {
        const userToken = verifyToken();

        const successUrl = window.location.origin + router.resolve({ name: 'payment.status' }).href;
        const cancelUrl = window.location.origin + router.resolve({ name: 'cart' }).href;

        // Petició a l'API per a iniciar el pagament
        const response = await axios.post(
            '/app/payment/initiate ',
            {
                cartItems: cartItems,
                success_url: successUrl,
                cancel_url: cancelUrl
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );
        return response;
    };

    const paymentInfo = async () => {
        const userToken = verifyToken();

        // Petició a l'API per a obtenir la informació del pagament
        const response = await axios.get('/app/payment/status/', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    return { initiatePayment, paymentInfo };
}
