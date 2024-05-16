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
            // Petició a l'API per a iniciar el pagament
            const response = await cartServ.initiatePayment(cartItems);
            console.log(response);

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
        const currentCart = getCartFromLocalStorage();
        const identifiedItem = currentCart.find((item) => item.variantId === variantId);

        if (!identifiedItem) {
            currentCart.push(productItem);
        } else {
            identifiedItem.quantity++;
        }

        saveCartToLocalStorage(currentCart);
    };

    const decrementQuantity = (index: number) => {
        const cart = getCartFromLocalStorage();
        if (cart[index].quantity === 1) {
            removeFromCart(index);
        } else {
            cart[index].quantity--;
            saveCartToLocalStorage(cart);
        }
    };

    const incrementQuantity = (index: number) => {
        const cart = getCartFromLocalStorage();
        cart[index].quantity++;
        saveCartToLocalStorage(cart);
    };

    const removeFromCart = (index: number) => {
        const cart = getCartFromLocalStorage();
        cart.splice(index, 1);
        saveCartToLocalStorage(cart);
    };

    const removeAllFromCart = () => {
        const cart: ProductItem[] = [];
        saveCartToLocalStorage(cart);
    };

    const saveCartToLocalStorage = (cart: ProductItem[]) => {
        const cartString = JSON.stringify(cart);
        localStorage.setItem('cart', cartString);
    };

    const getCartFromLocalStorage = (): ProductItem[] => {
        const cartString = localStorage.getItem('cart');
        const cartValue = cartString ? JSON.parse(cartString) : [];
        cart.value = cartValue;
        return cartValue;
    };

    return { paymentInfo, initiatePayment, payment, addToCart, getCartFromLocalStorage, saveCartToLocalStorage, cart, removeFromCart, removeAllFromCart, incrementQuantity, decrementQuantity };
});
