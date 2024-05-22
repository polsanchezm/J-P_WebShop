<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { ProductItem } from '@/models/productItem';
import { useCartStore } from '@/stores/cart/cart';
import { useWishlistStore } from '@/stores/wishlist/wishlist';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const isLoading = ref(true);

// Carrega la wishlist amb els productes que la conformen
onBeforeMount(async () => {
    await wishlistStore.wishlistItems();
    isLoading.value = false;
});

// Afegeix al carret de compra
const addToCart = (productDetail: ProductItem) => {
    const selectedVariant = productDetail.product.productVariants.find((variant) => variant.id === productDetail.variantId);

    const productItem: ProductItem = {
        id: productDetail.id,
        product: productDetail.product,
        productVariant: selectedVariant!,
        quantity: 1,
        wishlistId: productDetail.wishlistId,
        variantId: productDetail.variantId
    };
    cartStore.addToCart(productItem, productDetail.variantId);
};
</script>

<template>
    <div class="h-screen bg-gray-50 pt-4 mt-24 overflow-auto">
        <div class="bg-gray-400 dark:bg-gray-700 pt-[23px] p-5 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Your Wishlist</h2>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div class="flex flex-col lg:flex-row w-full mt-6 px-20">
            <div class="flex-1 flex flex-col gap-4 p-4">
                <div v-if="wishlistStore.wishlist.length > 0">
                    <div v-for="(item, index) in wishlistStore.wishlist" :key="index" class="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-xl">
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
                            <div class="flex flex-col items-center md:flex-row md:justify-end gap-4 mt-4">
                                <div class="text-gray-800 text-xl">{{ item.product.price }}€</div>
                                <button @click="wishlistStore.removeItemFromWishlist(item, item.productVariant.id)" class="p-2 rounded-full text-red-500 hover:text-red-700">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>

                                <button @click="addToCart(item)" class="p-2 rounded-full text-red-500 hover:text-red-700">
                                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="wishlistStore.wishlist.length === 0" class="text-center">
                    <p class="text-lg text-gray-800 font-semibold">Your Wishlist is empty</p>
                    <p class="text-sm text-gray-600">Add some products to your Wishlist</p>
                    <RouterLink :to="{ name: 'products' }" class="text-blue-900 font-semibold">Explore now</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
