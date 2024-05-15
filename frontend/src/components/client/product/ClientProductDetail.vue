<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref, watch } from 'vue';
import type { ProductItem } from '@/models/productItem';
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
const selectedColor = ref('');
const selectedSize = ref('');
const fillColor = ref('none');
const isLoading = ref(true);

onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    if (authServ.user) {
        await wishlistStore.wishlistItems();
    }
    isLoading.value = false;
    console.log('wishlist', wishlistStore.wishlist);
    console.log('product', productStore.productDetail);
});

const isSizeAvailableForColor = (size: string, color: string) => {
    return productStore.productVariants.some((variant) => variant.size === size && variant.color === color && variant.stock! > 0);
};

watch(selectedColor, (newColor) => {
    if (!isSizeAvailableForColor(selectedSize.value, newColor)) {
        selectedSize.value = '';
    }
});

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
    fillColor.value = fillColor.value === 'none' ? 'currentColor' : 'none';
};

const uniqueColors = computed(() => {
    const colors = productStore.productVariants.map((variant) => variant.color);
    return [...new Set(colors)];
});

const uniqueSizes = computed(() => {
    const sizes = productStore.productVariants.map((variant) => variant.size);
    return [...new Set(sizes)];
});
</script>

<template>
    <div class="bg-gray-100 mt-20 overflow-auto pb-28 md:pb-0 md:mb-0">
        <main class="pt-20 pb-0 mb-0 items-center">
            <div class="container mx-auto px-6 h-screen pb-28">
                <div v-if="isLoading" class="flex justify-center items-center h-full" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else>
                    <div v-if="productStore.productDetail">
                        <div class="md:flex md:items-center">
                            <!-- Product Image Section -->
                            <div class="w-full md:w-1/2">
                                <div class="relative pb-2/3">
                                    <!-- Aspect ratio container -->
                                    <img :src="productStore.productDetail.image" :alt="productStore.productDetail.name" class="w-full h-full object-contain rounded-xl" />
                                </div>
                            </div>
                            <!-- Product Details Section -->
                            <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                                <h3 class="text-gray-700 uppercase text-lg">{{ productStore.productDetail.name }}</h3>
                                <span class="text-gray-500 mt-3">{{ productStore.productDetail.price }}</span>
                                <p class="text-base text-gray-900">{{ productStore.productDetail.description }}</p>
                                <hr class="my-3" />

                                <!-- Color Selection -->
                                <div class="mt-3">
                                    <h3 class="text-sm font-medium text-gray-900 mb-6">Color</h3>
                                    <div class="flex items-center space-x-3">
                                        <div v-for="color in uniqueColors" :key="color" class="relative">
                                            <input type="radio" :id="'color-' + color" v-model="selectedColor" :value="color" class="hidden cursor-pointer h-7 w-7" />
                                            <label :for="'color-' + color" :class="['inline-block h-7 w-7 rounded-full cursor-pointer', selectedColor === color ? 'ring-2 ring-gray-700 ring-offset-2 ring-offset-white' : '']" :style="{ backgroundColor: color }"></label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Size Selection -->
                                <div class="mt-3">
                                    <h3 class="text-sm font-medium text-gray-900 mb-6">Size</h3>
                                    <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        <div v-for="size in uniqueSizes" :key="size">
                                            <input type="radio" :id="'size-' + size" v-model="selectedSize" :value="size" :disabled="!isSizeAvailableForColor(size, selectedColor)" class="hidden" />
                                            <label :for="'size-' + size" :class="[!isSizeAvailableForColor(size, selectedColor) ? 'cursor-not-allowed bg-gray-50 text-gray-200' : 'cursor-pointer bg-white text-gray-900 shadow-sm', 'group flex items-center justify-center rounded-xl border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6', selectedSize === size ? 'ring-2 ring-gray-700 ring-offset-2 ring-offset-white' : '']">{{ size }}</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Authentication and Role-Based Actions -->
                                <div v-if="authServ.userRole === 'client'">
                                    <div class="flex items-center mt-6">
                                        <button @click.prevent="addToCart" class="px-4 py-4 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-xl text-sm md:text-base text-center">Add to Cart</button>
                                        <button @click="toggleItemInWishlist" class="ml-3 px-4 py-4 hover:bg-gray-100 border rounded-xl p-2 focus:outline-none">
                                            <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="fillColor">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div v-else-if="authServ.userRole !== 'manager'" class="flex items-center mt-6">
                                    <RouterLink :to="{ name: 'login' }" class="text-neutral-100 bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-100 dark:hover:text-neutral-800 transition-colors font-medium rounded-xl text-base px-6 py-3 lg:px-7 lg:py-3.5 mr-2 focus:outline-none">Login to Buy</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
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
