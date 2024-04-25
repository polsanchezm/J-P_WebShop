<script setup lang="ts">
import { useProductStore } from '@/stores/product/product';
import { useCartStore } from '@/stores/client/cart';
import { useWishlistStore } from '@/stores/client/wishlist';
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue';

const route = useRoute();

const paramId = route.params.id
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    console.log('product', productStore.oneProductDetail);
});
</script>

<template>
    <div v-if="productStore.oneProductDetail" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productStore.oneProductDetail!.id }}</p>
        <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ productStore.oneProductDetail!.name }}</p>
        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ productStore.oneProductDetail!.description }}</p>
        <p class="text-gray-700"><span class="font-semibold">Image:</span> {{ productStore.oneProductDetail!.image }}</p>
        <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ productStore.oneProductDetail!.price }}</p>
        <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ productStore.oneProductDetail!.category_id }}</p>
        <ul>
            <li v-if="productStore.productVariants" v-for="(productVariant, index) in productStore.productVariants" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productVariant!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant!.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant!.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant!.product_id }}</p>
                <!-- <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/user/orders/detail/' + product.id">View details</RouterLink> -->
                <button @click="cartStore.addToCart(productVariant!)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Add to cart
                </button>
                <button @click="wishlistStore.addToWishlist(productVariant!)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>