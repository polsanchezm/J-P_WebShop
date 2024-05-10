<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import type { ProductItem } from '@/models/productItem';
import type { Product } from '@/models/product';
import { useCartStore } from '@/stores/cart/cart';
import { useAuthStore } from '@/stores/auth/auth';
import { useProductStore } from '@/stores/product/product';
import { useWishlistStore } from '@/stores/wishlist/wishlist';

const authServ = useAuthStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const route = useRoute();
const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    console.log('product', productStore.productDetail);
});


const addToCart = (productDetail: Product, variantId: number) => {
    const selectedVariant = productDetail.productVariants.find(variant => variant.id === variantId);
    console.log(selectedVariant);

    const productItem: ProductItem = {
        id: productDetail.id,
        product: productDetail,
        productVariant: selectedVariant!,
        quantity: 1,
        wishlistId: productDetail.wishlistId,
        variantId: variantId,
    }
    cartStore.addToCart(productItem, variantId);
};
</script>

<template>
    <div v-if="productStore.productDetail" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-32">
        <img v-if="productStore.productDetail!.image" :src="productStore.productDetail!.image" />
        <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productStore.productDetail!.id }}
        </p>
        <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ productStore.productDetail!.name
            }}
        </p>
        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{
            productStore.productDetail!.description }}</p>
        <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ productStore.productDetail!.price
            }}</p>
        <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{
            productStore.productDetail!.categoryId }}</p>
        <ul v-if="productStore.productVariants">
            <li v-for="(productVariant, index) in productStore.productVariants" :key="index">
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ productVariant!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant!.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant!.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant!.productId }}
                </p>
                <div v-if="authServ.userRole === 'client'">
                    <button @click="addToCart(productStore.productDetail!, productVariant!.id)"
                        class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Add
                        to cart</button>
                    <button @click="wishlistStore.addItemToWishlist(productVariant)"
                        class="inline-block mt-4 text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
