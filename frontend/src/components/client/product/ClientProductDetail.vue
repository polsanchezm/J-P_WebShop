<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, watch } from 'vue';
import type { ProductItem } from '@/models/productItem';
import type { Product } from '@/models/product';
import { useCartStore } from '@/stores/cart/cart';
import { useAuthStore } from '@/stores/auth/auth';
import { useProductStore } from '@/stores/product/product';
import { useWishlistStore } from '@/stores/wishlist/wishlist';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import type { ProductVariant } from '@/models/productVariant';

const authServ = useAuthStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const route = useRoute();
const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);
const selectedColor = ref('');
const selectedSize = ref('');
const fillColor = ref('none');

onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    await wishlistStore.wishlistItems();
    console.log('wishlist', wishlistStore.wishlist);
    console.log('product', productStore.productDetail);
});

watch(selectedColor, (newColor) => {
    if (!isSizeAvailableForColor(selectedSize.value, newColor)) {
        selectedSize.value = ''; // Resetea la selección de tamaño si no está disponible
    }
});

const isSizeAvailableForColor = (size: string, color: string) => {
    return productStore.productVariants.some((variant) => variant.size === size && variant.color === color && variant.stock! > 0);
};

const toggleColor = () => {
    fillColor.value = fillColor.value === 'none' ? 'currentColor' : 'none';
};

const addToCart = () => {
    if (!selectedColor.value || !selectedSize.value) {
        console.error('Color or size is not selected');
        return;
    }

    const selectedVariant = productStore.productDetail?.productVariants.find((variant) => variant.color === selectedColor.value && variant.size === selectedSize.value);
    console.log('selected Variant', selectedVariant);

    const productItem: ProductItem = {
        id: productStore.productDetail!.id,
        product: productStore.productDetail!,
        productVariant: selectedVariant!,
        quantity: 1,
        wishlistId: productStore.productDetail!.wishlistId,
        variantId: selectedVariant!.id
    };
    cartStore.addToCart(productItem, selectedVariant!.id);
};

const toggleItemInWishlist = () => {
    if (!selectedColor.value || !selectedSize.value) {
        console.error('Color or size is not selected');
        return;
    }

    const selectedVariant = productStore.productDetail?.productVariants.find((variant) => variant.color === selectedColor.value && variant.size === selectedSize.value);
    console.log('selected Variant', selectedVariant);
    console.log('selected Variant', selectedVariant!.id);

    wishlistStore.toggleItemInWishlist(selectedVariant!, selectedVariant!.id);
    toggleColor();
};
</script>

<template>
    <div v-if="productStore.productDetail">
        <div class="bg-white mt-28">
            <main class="py-6 my-8">
                <div class="container mx-auto px-6">
                    <div class="md:flex md:items-center">
                        <div class="w-full h-64 md:w-1/2 lg:h-96">
                            <img :src="productStore.productDetail.image" :alt="productStore.productDetail.name" class="h-full w-full rounded-xl object-cover max-w-lg mx-auto" />
                        </div>
                        <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                            <h3 class="text-gray-700 uppercase text-lg">{{ productStore.productDetail.name }}</h3>
                            <span class="text-gray-500 mt-3">{{ productStore.productDetail.price }}</span>
                            <p class="text-base text-gray-900">{{ productStore.productDetail.description }}</p>
                            <hr class="my-3" />
                            <div class="mt-3">
                                <RadioGroup v-model="selectedColor" class="mt-4">
                                    <h3 class="text-sm font-medium text-gray-900 mb-6">Color</h3>
                                    <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                                    <div class="flex items-center space-x-3">
                                        <RadioGroupOption v-for="(variant, index) in productStore.productVariants" :key="'color-' + index" :value="variant.color">
                                            <div :class="['h-7 w-7 rounded-full cursor-pointer', selectedColor === variant.color ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : '']" :style="{ backgroundColor: variant.color }"></div>
                                        </RadioGroupOption>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div class="mt-3">
                                <h3 class="text-sm font-medium text-gray-900 mt-10 mb-6">Size</h3>
                                <RadioGroup v-model="selectedSize" class="mt-4">
                                    <RadioGroupLabel class="sr-only">Choose a size</RadioGroupLabel>
                                    <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        <RadioGroupOption v-for="(variant, index) in productStore.productVariants" :key="'size-' + index" :value="variant.size" :disabled="!variant.stock || !isSizeAvailableForColor(variant.size, selectedColor)">
                                            <span :class="[!isSizeAvailableForColor(variant.size, selectedColor) || !variant.stock ? 'cursor-not-allowed bg-gray-50 text-gray-200' : 'cursor-pointer bg-white text-gray-900 shadow-sm', 'group relative flex items-center justify-center rounded-xl border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6', selectedSize === variant.size ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : '']">{{ variant.size }}</span>
                                        </RadioGroupOption>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div v-if="authServ.userRole === 'client'">
                                <div class="flex items-center mt-6">
                                    <button @click.prevent="addToCart" class="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Add to Cart</button>
                                    <button @click="toggleItemInWishlist" class="mx-2 text-gray-600 border rounded-xl p-2 focus:outline-none">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" :fill="fillColor" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                        </svg>
                                    </button>
                                    <!-- <div v-for="(item, index) in wishlistStore.wishlist" :key="index">
                                        <button @click="wishlistStore.toggleItemInWishlist(item)">
                                            {{ isInWishlist(item) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
                                        </button>
                                    </div> -->
                                </div>
                            </div>
                            <div v-else>
                                <div class="flex items-center mt-6">
                                    <RouterLink :to="{ name: 'login' }" class="text-neutral-100 bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-100 dark:hover:text-neutral-800 transition-colors font-medium rounded-xl text-base px-6 py-3 lg:px-7 lg:py-3.5 mr-2 focus:outline-none">Login to Buy</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<!-- <template>
    <div v-if="productStore.productDetail" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-32">
        <img v-if="productStore.productDetail!.image" :src="productStore.productDetail!.image" />
        <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productStore.productDetail!.id }}</p>
        <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ productStore.productDetail!.name }}</p>
        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ productStore.productDetail!.description }}</p>
        <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ productStore.productDetail!.price }}</p>
        <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ productStore.productDetail!.categoryId }}</p>
        <ul v-if="productStore.productVariants">
            <li v-for="(productVariant, index) in productStore.productVariants" :key="index">
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ productVariant!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant!.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant!.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant!.productId }}</p>
                <div v-if="authServ.userRole === 'client'">
                    <button @click="addToCart(productStore.productDetail!, productVariant!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Add to cart</button>
                    <button @click="wishlistStore.addItemToWishlist(productVariant)" class="inline-block mt-4 text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template> -->
