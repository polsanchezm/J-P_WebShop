<script setup lang="ts">
import { useWishlistStore } from '@/stores/client/wishlist';
import { onBeforeMount } from 'vue';
import { useCartStore } from '@/stores/client/cart';
import type { ProductItem } from '@/models/productItem';

const wishlistStore = useWishlistStore();

onBeforeMount(async () => {
    await wishlistStore.wishlistItems();
    console.log('wishlist', wishlistStore.wishlist);
});
const cartStore = useCartStore();
const addToCart = (productItem: ProductItem, index: number) => {
    console.log(productItem);

    cartStore.addToCart({
        id: productItem.id,
        product: productItem.product,
        productVariant: productItem.product.productVariants[index],
        quantity: 1,
        wishlistId: productItem.wishlistId
    });
};
</script>

<template>
    <div v-if="wishlistStore.wishlist" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24">
        <p class="text-lg font-semibold mb-2 text-gray-700">Items</p>
        <ul>
            <li v-for="(item, index) in wishlistStore.wishlist" :key="index">
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ item!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Wishlist ID:</span> {{ item!.wishlistId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product Name:</span> {{ item!.product.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product Image:</span> {{ item!.product.image }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ item.product.productVariants[index].stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product Prize:</span> {{ item!.product.price }}</p>

                <button @click="addToCart(item, index)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Comprar</button>
            </li>
        </ul>
        <p v-if="wishlistStore.wishlist.length === 0">No items</p>
    </div>
</template>

<style scoped></style>
