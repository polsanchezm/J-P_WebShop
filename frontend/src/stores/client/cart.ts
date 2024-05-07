import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type ProductItem } from '@/models/productItem';
import type { Product } from '@/models/product';
import axios, { type ErrorResponse } from '@/lib/axios';
import router from '@/router';
import { useVerifyToken } from '@/composables/verifyToken';
export const useCartStore = defineStore('cart', () => {
    const cart = ref<ProductItem[]>([]);
    const payment = ref<[]>([]);
    const { verifyToken } = useVerifyToken();

    const initiateStripePayment = async (cartItems: any) => {
        try {
            const userToken = verifyToken();

            const successUrl = window.location.origin + router.resolve({ name: 'payment.success' }).href;
            const cancelUrl = window.location.origin + router.resolve({ name: 'payment.cancel' }).href;

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
                window.location.href = response.data.url; // URL para completar el pago en Stripe
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer el pagament', errorMessage);
        }
    };

    const paymentInfo = async (sessionId: any) => {
        try {
            const userToken = verifyToken();

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
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer el pagament', errorMessage);
        }
    };

    const addToCart = (productItem: ProductItem) => {
        const identifiedItem = cart.value.find((item) => item.id === productItem.id);
        if (!identifiedItem) {
            const item: ProductItem = productItem;
            cart.value.push(item);
        } else {
            identifiedItem.quantity++;
        }
        saveCartToCookie(cart.value);
    };

    const decrementQuantity = (item: ProductItem, index: number) => {
        item.quantity === 1 ? removeFromCart(index) : item.quantity--;
        saveCartToCookie(cart.value);
    };

    const incrementQuantity = (item: ProductItem) => {
        item.quantity++;
        saveCartToCookie(cart.value);
    };

    const removeFromCart = (index: number) => {
        cart.value.splice(index, 1);
        saveCartToCookie(cart.value);
    };

    const removeAllFromCart = () => {
        cart.value = [];
        saveCartToCookie(cart.value);
    };

    const saveCartToCookie = (cart: ProductItem[], daysToExpire: number = 30) => {
        const date = new Date();
        date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Dies a milisegons
        const expires = 'expires=' + date.toUTCString();
        const cartString = JSON.stringify(cart);
        document.cookie = 'cart=' + encodeURIComponent(cartString) + ';' + expires + ';path=/';
    };

    const getCartFromCookie = (): Product[] | null => {
        const cartJson = getCookie('cart');
        if (cartJson) {
            try {
                cart.value = JSON.parse(decodeURIComponent(cartJson));
            } catch (e) {
                console.error('Error parsing cart JSON:', e);
            }
        }
        return null;
    };

    const getCookie = (name: string): string | null => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const cookieParts = cookie.split('=');
            if (cookieParts[0] === name) {
                console.log(cookieParts[1]);
                return cookieParts[1];
            }
        }
        return null;
    };

    return { payment, addToCart, getCartFromCookie, decrementQuantity, incrementQuantity, removeFromCart, removeAllFromCart, cart, initiateStripePayment, paymentInfo };
});
