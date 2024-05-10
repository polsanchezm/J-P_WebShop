<script setup lang="ts">
import { onBeforeMount } from 'vue';
import type { ProductItem } from '@/models/productItem';
import { useCartStore } from '@/stores/cart/cart';
import { useWishlistStore } from '@/stores/wishlist/wishlist';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

onBeforeMount(async () => {
    await wishlistStore.wishlistItems();
    console.log('wishlist', wishlistStore.wishlist);
});
const addToCart = (productDetail: ProductItem) => {
    const selectedVariant = productDetail.product.productVariants.find(variant => variant.id === productDetail.variantId);
    console.log(selectedVariant);

    const productItem: ProductItem = {
        id: productDetail.id,
        product: productDetail.product,
        productVariant: selectedVariant!,
        quantity: 1,
        wishlistId: productDetail.wishlistId,
        variantId: productDetail.variantId,
    }
    cartStore.addToCart(productItem, productDetail.variantId);
};
</script>

<template>
    <div v-if="wishlistStore.wishlist" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24">
        <p class="text-lg font-semibold mb-2 text-gray-700">Items</p>
        <ul>
            <li v-for="(item, index) in wishlistStore.wishlist" :key="index">
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ item!.product.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ item!.variantId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Wishlist ID:</span> {{ item!.wishlistId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product Name:</span> {{ item!.product.name }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product Image:</span> {{ item!.product.image }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product Prize:</span> {{ item!.product.price }}</p>

                <button @click="addToCart(item)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Comprar</button>
            </li>
        </ul>
        <p v-if="wishlistStore.wishlist.length === 0">No items</p>
    </div>
</template>

<style scoped></style>
