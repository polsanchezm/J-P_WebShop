<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useCartStore } from '@/stores/cart/cart';

const cartStore = useCartStore();

onBeforeMount(() => {
    cartStore.getCartFromLocalStorage();
    console.log('cart', cartStore.cart);
});

const cartItems = computed(() => {
    const items = cartStore.cart.map((item) => ({
        price: item.product.price,
        name: item.product.name,
        variant_id: item.productVariant.id,
        quantity: item.quantity
    }));
    return items;
});

const shippingCost = 3.99;
const subtotalPrice = computed(() => {
    return cartStore.cart
        .reduce((total, item: any) => {
            const price = parseFloat(item.product.price);
            const quantity = parseInt(item.quantity);
            return total + price * quantity;
        }, 0)
        .toFixed(2);
});

const totalPrice = computed(() => {
    return (parseFloat(subtotalPrice.value) + shippingCost).toFixed(2);
});

const totalQuantity = computed(() => {
    return cartStore.cart.reduce((sum, item) => sum + item.quantity, 0);
});
</script>

<template>
    <div class="h-dvh bg-white mt-28 md:mt-28 lg:mt-28 px-4 md:px-8 lg:px-14 py-7">
        <div class="flex flex-col lg:flex-row w-full">
            <div class="flex-1 flex flex-col gap-4 p-4">
                <p class="text-blue-900 text-xl font-extrabold text-center">My cart</p>
                <div v-if="cartStore.cart.length > 0">
                    <div v-for="(item, index) in cartStore.cart" :key="index" class="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-xl">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
                            <div class="flex flex-col items-center gap-6 md:flex-row md:items-center">
                                <div class="w-20 h-20 md:w-28 md:h-28">
                                    <img class="w-full h-full rounded-xl" :src="item.product.image" :alt="item.product.description" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <p class="text-lg text-gray-800 font-semibold">{{ item.product.name }}</p>
                                    <p class="text-xs text-gray-600">
                                        Color: <span class="font-normal">{{ item.productVariant.color }}</span>
                                    </p>
                                    <p class="text-xs text-gray-600">
                                        Size: <span class="font-normal">{{ item.productVariant.size }}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center justify-center gap-4 mt-4">
                                <button @click="cartStore.decrementQuantity(index)" class="w-6 h-6 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <input readonly class="w-8 h-8 text-center outline-none" :value="item.quantity" />
                                <button @click="cartStore.incrementQuantity(index)" class="w-6 h-6 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div class="flex flex-col items-center md:flex-row md:justify-end gap-4 mt-4">
                                <div class="text-gray-800 text-xl">{{ item.product.price }} €</div>
                                <button @click="cartStore.removeFromCart(index)" class="p-2 rounded-full text-red-500 hover:text-red-700">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center">
                    <p class="text-lg text-gray-800 font-semibold">Your cart is empty</p>
                    <p class="text-sm text-gray-600">Add some products to your cart</p>
                    <RouterLink :to="{ name: 'products' }" class="text-blue-900 font-semibold">Shop now</RouterLink>
                </div>
            </div>
            <div v-if="cartStore.cart.length > 0" class="w-full lg:w-1/2 xl:w-1/3 flex flex-col gap-4 p-4">
                <p class="text-blue-900 text-xl font-extrabold text-center md:text-left">Purchase Resume</p>
                <div class="flex flex-col gap-4 p-4 text-lg font-semibold shadow-md border rounded-xl">
                    <div class="flex flex-col items-center md:flex-row md:justify-between">
                        <p class="text-gray-600">Subtotal ({{ totalQuantity }} Items)</p>
                        <p class="font-bold">{{ subtotalPrice }}</p>
                    </div>
                    <hr class="bg-gray-200" />
                    <div class="flex flex-col items-center md:flex-row md:justify-between">
                        <p class="text-gray-600">Shipping Cost</p>
                        <p class="font-bold">{{ shippingCost }} €</p>
                    </div>
                    <hr class="bg-gray-200" />
                    <div class="flex flex-col items-center md:flex-row md:justify-between">
                        <p class="text-gray-600">Total</p>
                        <p class="font-bold">{{ totalPrice }}</p>
                    </div>
                    <button @click="cartStore.initiatePayment(cartItems)" class="bg-blue-600 hover:bg-blue-700 p-2 rounded-xl w-full text-white shadow-md">SUBMIT ORDER</button>
                </div>
            </div>
        </div>
    </div>
</template>
