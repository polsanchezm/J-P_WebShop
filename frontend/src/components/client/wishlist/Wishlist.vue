<script setup lang="ts">
import { useWishlistStore } from '@/stores/client/wishlist';
import { onBeforeMount, computed } from 'vue';
import { useCartStore } from '@/stores/client/cart';

const wishlistStore = useWishlistStore();

onBeforeMount(async () => {
    await wishlistStore.wishlistItems();
    console.log('wishlist', wishlistStore.wishlist);
});

const cartStore = useCartStore();

// onBeforeMount(async () => {
//     await productStore.Products();
//     console.log('wishlist', productStore.wishlist);
// });
</script>

<template>
    <div v-if="wishlistStore.wishlist" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Items</p>
        <!-- <button v-if="wishlistStore.wishlist.length > 0" @click="wishlistStore.removeAllFromCart()"
            class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
            Remove All</button> -->
        <ul>
            <li v-for="(item, index) in wishlistStore.wishlist" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ item!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Wishlist ID:</span> {{ item!.wishlist_id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ item!.variant_id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ item!.quantity }}</p>

                <button @click="cartStore.addToCart(item!)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Comprar</button>

                <!-- <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/user/orders/detail/' + product.id">View details</RouterLink> -->
                <!-- <button @click="wishlistStore.decrementQuantity(item, index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    -</button>
                <button @click="wishlistStore.incrementQuantity(item)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    +</button>
                <button @click="wishlistStore.removeFromCart(index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Remove</button> -->
            </li>
        </ul>
        <p v-if="wishlistStore.wishlist.length === 0">No items</p>
    </div>
</template>

<style scoped></style>
