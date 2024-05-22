import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type ProductItem } from '@/models/productItem';
import { cartService } from '@/services/cart/cart';
import router from '@/router';
import type { AxiosError } from 'axios';
import type { Payment } from '@/models/payment';
export const useCartStore = defineStore('cart', () => {
    const cart = ref<ProductItem[]>([]);
    const payment = ref<Payment | null>(null);
    const cartServ = cartService();

    const initiatePayment = async (cartItems: any) => {
        try {
            // Obté la resposta de la petició a l'API per a iniciar el pagament
            const response = await cartServ.initiatePayment(cartItems);

            if (response.status === 200) {
                window.location.href = response.data.url; // URL per completar el pagament en Stripe
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al fer el pagament', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const paymentInfo = async () => {
        try {
            // Desa la resposta de la petició a l'API per a obtenir la informació del pagament
            const response = await cartServ.paymentInfo();

            if (response.status === 200) {
                payment.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            console.error('Error al fer el pagament', errorMessage);
            if (errorMessage.response!.status == 404) {
                router.push({ name: 'error404' });
            }
        }
    };

    const addToCart = (productItem: ProductItem, variantId: number) => {
        // Agafa les dades del carret de compra del Local Storage
        const currentCart = getCartFromLocalStorage();

        // Cerca si un producte ja es troba en el carret de compra
        const identifiedItem = currentCart.find((item) => item.variantId === variantId);

        if (!identifiedItem) {
            // Si no es troba, l'afegeix
            currentCart.push(productItem);
        } else {
            // Si es troba, incrementa la seva quantitat
            identifiedItem.quantity++;
        }

        saveCartToLocalStorage(currentCart);
    };

    const decrementQuantity = (index: number) => {
        // Agafa les dades del carret de compra del Local Storage
        const cart = getCartFromLocalStorage();
        if (cart[index].quantity === 1) {
            // Si la quantitat arriba a 0, esborra el producte del carret de compra
            removeFromCart(index);
        } else {
            // Redueix la quantitat i actualitza la informació del carret de compra al Local Storage
            cart[index].quantity--;
            saveCartToLocalStorage(cart);
        }
    };

    const incrementQuantity = (index: number) => {
        // Agafa les dades del carret de compra del Local Storage
        const cart = getCartFromLocalStorage();

        // Incrementa la quantitat i actualitza la informació del carret al Local Storage
        cart[index].quantity++;
        saveCartToLocalStorage(cart);
    };

    const removeFromCart = (index: number) => {
        // Desa en un array les dades del Local Storage, elimina l'element i l'actualiza
        const cart = getCartFromLocalStorage();
        cart.splice(index, 1);
        saveCartToLocalStorage(cart);
    };

    const removeAllFromCart = () => {
        // Elimina tots els productes del carret de la compra i del Local Storage
        const cart: ProductItem[] = [];
        saveCartToLocalStorage(cart);
    };

    const saveCartToLocalStorage = (cart: ProductItem[]) => {
        // Converteix les dades en una cadena JSON
        const cartString = JSON.stringify(cart);

        // Desa la cadena JSON al Local Storage amb la clau 'cart'
        localStorage.setItem('cart', cartString);
    };

    const getCartFromLocalStorage = (): ProductItem[] => {
        // Obté el carret en format cadena JSON del localStorage
        const cartString = localStorage.getItem('cart');

        // Parseja la cadena JSON per obtenir el valor del carret i desar-ho a l'array cart
        const cartValue = cartString ? JSON.parse(cartString) : [];
        cart.value = cartValue;
        return cartValue;
    };

    return { paymentInfo, initiatePayment, payment, addToCart, getCartFromLocalStorage, saveCartToLocalStorage, cart, removeFromCart, removeAllFromCart, incrementQuantity, decrementQuantity };
});
