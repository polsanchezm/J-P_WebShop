<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/product/product';
import { useRoute } from 'vue-router';
const productStore = useProductStore();
const router = useRoute();
const isHome = computed(() => router.name === 'home');

// Carrega els productes
async function loadProducts() {
    try {
        if (isHome.value) {
            // Si està al home carrega/mostra 4 productes
            await productStore.initialProducts(4);
            console.log('4 productes:', productStore.products);
        } else {
            // Si no, carrega tots
            await productStore.allProducts();
            console.log('tots els productes:', productStore.products);
        }
    } catch (error) {
        console.error('Error al carregar els productes:', error);
    }
}

onBeforeMount(loadProducts);
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center mt-28">
        <div class="relative m-3 flex mx-auto justify-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl w-full">
                <div v-for="(product, index) in productStore.products" :key="index" class="relative bg-white shadow-md rounded-xl p-2 cursor-pointer" style="min-height: 500px">
                    <RouterLink :to="{ name: 'products.detail', params: { id: product.id } }">
                        <div class="overflow-x-hidden rounded-xl relative">
                            <img class="h-96 rounded-xl w-full object-cover" :src="product.image" />
                            <p class="absolute right-2 top-2 bg-white rounded-xl p-2 cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </p>
                        </div>
                        <div class="mt-4 pl-2 mb-2 flex justify-between">
                            <div>
                                <p class="text-lg font-semibold text-gray-900 mb-0">{{ product.name }}</p>
                                <p class="text-md text-gray-800 mt-0">{{ product.price }}</p>
                            </div>
                            <div class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
