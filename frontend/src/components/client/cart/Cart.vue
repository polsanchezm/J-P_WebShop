<script setup lang="ts">
import { useCartStore } from '@/stores/client/cart';
import { onBeforeMount, computed } from 'vue';

const cartStore = useCartStore();

onBeforeMount(async () => {
    await cartStore.getCartFromCookie();
    console.log('cart', cartStore.cart);
});
</script>

<template>
    <div v-if="cartStore.cart" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Items</p>
        <button v-if="cartStore.cart.length > 0" @click="cartStore.removeAllFromCart()"
            class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Remove
            All</button>
        <ul>
            <li v-for="(item, index) in cartStore.cart" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ item!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ item!.name }}</p>
                <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ item!.description }}</p>
                <p class="text-gray-700"><span class="font-semibold">Image:</span> {{ item!.image }}</p>
                <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ item!.price }}</p>
                <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ item!.category_id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ item!.quantity }}</p>

                <!-- <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/user/orders/detail/' + product.id">View details</RouterLink> -->
                <button @click="cartStore.decrementQuantity(item, index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">-</button>
                <button @click="cartStore.incrementQuantity(item)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">+</button>
                <button @click="cartStore.removeFromCart(index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Remove</button>
            </li>
        </ul>
        <p v-if="cartStore.cart.length === 0">No items</p>
    </div>
</template>

<style scoped></style>
