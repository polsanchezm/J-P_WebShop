import { defineStore } from "pinia";
import axios, { type ErrorResponse, type UserApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type ProductVariant } from "@/models/productVariant";
import { type CartItem } from "@/models/cartItem";

export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartItem[]>([]);

    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const addToCart = (productVariant: ProductVariant) => {
        let identifiedItem = cart.value.find((item) => item.id === productVariant.id)
        if (!identifiedItem){
            const item: CartItem = {
                ...productVariant,
                quantity: 1
            }
            cart.value.push(item)
        } else {
            identifiedItem.quantity++
        }
        saveCartToCookie(cart.value);
    }

    const decrementQuantity = (item: CartItem, index: number) => {
        item.quantity === 1 ? removeFromCart(index) : item.quantity--;
        saveCartToCookie(cart.value)
    }

    const incrementQuantity = (item: CartItem) => {
        item.quantity++
        saveCartToCookie(cart.value)
    }

    const removeFromCart = (index: number) => {
        cart.value.splice(index, 1);
        saveCartToCookie(cart.value);
    }

    const removeAllFromCart = () => {
        cart.value = []
        saveCartToCookie(cart.value);
    }

    const saveCartToCookie = (cart: CartItem[], daysToExpire: number = 30) => {
        const d = new Date();
        d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));  // Días a milisegundos
        const expires = "expires=" + d.toUTCString();
        const cartString = JSON.stringify(cart);
        document.cookie = "cart=" + encodeURIComponent(cartString) + ";" + expires + ";path=/";
    }
    

    const getCartFromCookie = (): CartItem[] | null => {
        let cartJson = getCookie('cart');
        if (cartJson) {
            try {
                cart.value = JSON.parse(decodeURIComponent(cartJson));
            } catch (e) {
                console.error("Error parsing cart JSON:", e);
            }
        }
        return null;
    }

    const getCookie = (name: string): string | null => {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            let cookieParts = cookie.split('=');
            if (cookieParts[0] === name) {
                console.log(cookieParts[1])
                return cookieParts[1];
            }
        }
        return null;
    }

    return {addToCart, getCartFromCookie, decrementQuantity, incrementQuantity, removeFromCart, removeAllFromCart, cart}
})