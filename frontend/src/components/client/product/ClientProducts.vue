<script setup lang="ts">
import PaginationComponent from '@/components/layout/PaginationComponent.vue';
import { onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();
async function loadProducts(page: number) {
    await productStore.allProducts(15, page);
    console.log('tots els productes:', productStore.products);
}

onBeforeMount(() => loadProducts(1));
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center mt-28 pt-10">
        <div class="relative m-3 flex mx-auto justify-center">
            <div class="flex flex-wrap justify-center max-w-7xl w-full">
                <div v-for="(product, index) in productStore.products" :key="index"
                    class="relative bg-white shadow-md rounded-xl p-2 cursor-pointer m-6 
                            flex-grow flex-shrink basis-[300px]"> <!-- Ajuste Tailwind para flexbox -->
                    <RouterLink :to="{ name: 'products.detail', params: { id: product.id } }">
                        <div class="overflow-x-hidden rounded-xl relative">
                            <img class="h-96 rounded-xl w-full object-cover" :src="product.image" />
                        </div>
                        <div class="mt-4 pl-2 mb-2 flex justify-between">
                            <div>
                                <p class="text-lg font-semibold text-gray-900 mb-0">{{ product.name }}</p>
                                <p class="text-md text-gray-800 mt-0">{{ product.price }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <PaginationComponent />
    </div>
</template>
