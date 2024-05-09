import axios, { type ErrorResponse } from '@/lib/axios';
import { ref } from 'vue';
import router from '@/router';
import { useVerifyToken } from '@/composables/verifyToken';

export function cartService() {
    const { verifyToken } = useVerifyToken();
    const payment = ref<[]>([]);

    const initiateStripePayment = async (cartItems: any) => {
        try {
            const userToken = verifyToken();

            const successUrl = window.location.origin + router.resolve({ name: 'payment.success' }).href;
            const cancelUrl = window.location.origin + router.resolve({ name: 'payment.cancel' }).href;

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
            console.log(response);

            if (response.status === 200) {
                window.location.href = response.data.url; // URL per completar el pagament en Stripe
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al fer el pagament', errorMessage);
        }
    };


    const paymentInfo = async (sessionId: any) => {
        try {
            const userToken = verifyToken();

            // Petició a l'API per a obtenir la informació del pagament
            const response = await axios.get(`/app/payment/success/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status === 200) {
                payment.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            console.error('Error al fer el pagament', errorMessage);
        }
    };

    return { initiateStripePayment, paymentInfo, payment };
}
