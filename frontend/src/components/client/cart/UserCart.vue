<script setup lang="ts">
import { useCartStore } from '@/stores/client/cart';
import { computed, onBeforeMount } from 'vue';

const cartStore = useCartStore();

onBeforeMount(() => {
    cartStore.getCartFromCookie();
    console.log('cart', cartStore.cart);
});

const totalPrice = computed(() => {
    const total = cartStore.cart.reduce((total, item: any) => {
        return total + (item.productPrice * item.quantity);
    }, 0);
    return total.toFixed(2);
});
</script>

<template>
    <div v-if="cartStore.cart" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Items</p>
        <button v-if="cartStore.cart.length > 0" @click="cartStore.removeAllFromCart()"
            class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
            Remove All</button>
        <ul>
            <li v-for="(item, index) in cartStore.cart" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ item!.productId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ item!.productName }}</p>
                <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ item!.productPrice }}</p>
                <p class="text-gray-700"><span class="font-semibold">Image:</span> {{ item!.productImage }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ item!.variantId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ item!.productStock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ item!.quantity }}</p>

                <!-- <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/user/orders/detail/' + product.id">View details</RouterLink> -->
                <button @click="cartStore.decrementQuantity(item, index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    -</button>
                <button @click="cartStore.incrementQuantity(item)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    +</button>
                <button @click="cartStore.removeFromCart(index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Remove</button>
            </li>
            <p class="text-gray-700"><span class="font-semibold">Total price:</span> {{ totalPrice }}</p>
        </ul>
        <p v-if="cartStore.cart.length === 0">No items</p>
    </div>
</template>

<style scoped></style>