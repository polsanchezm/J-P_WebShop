import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type ProductItem } from '@/models/productItem';
import type { Product } from '@/models/product';
import axios, { type ErrorResponse } from '@/lib/axios';

export const useCartStore = defineStore('cart', () => {
    const cart = ref<ProductItem[]>([]);

    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const initiateStripePayment = async (cartItems: any) => {
        console.log(cartItems);
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            console.log(tokenObj.value);

            const response = await axios.post(
                '/app/payment/initiate ',
                {
                    cartItems: cartItems,
                    success_url: window.location.origin + '/user/payment/success',
                    cancel_url: window.location.origin + '/user/payment/cancel'
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
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

    const addToCart = (productItem: ProductItem) => {
        console.log('variant', productItem);

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
        const d = new Date();
        d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Días a milisegundos
        const expires = 'expires=' + d.toUTCString();
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

    return { addToCart, getCartFromCookie, decrementQuantity, incrementQuantity, removeFromCart, removeAllFromCart, cart, initiateStripePayment };
});
