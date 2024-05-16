<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useProductStore } from '@/stores/product/product';
import PaginationComponent from '@/components/layout/PaginationComponent.vue';

const productStore = useProductStore();
const isLoading = ref(true);

async function loadProducts(page: number) {
    await productStore.allProducts(15, page);
    isLoading.value = false;
    console.log('tots els productes:', productStore.products);
}

onBeforeMount(() => loadProducts(1));
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center mt-20 pt-12">
        <div class="relative m-3 flex mx-auto justify-center">
            <div class="flex flex-wrap justify-center max-w-7xl w-full">
                <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else class="flex flex-wrap justify-center max-w-7xl w-full">
                    <div class="w-1/2 flex justify-center my-4">
                        <RouterLink :to="{ name: 'manager.products.add' }" class="bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-white text-center py-4 px-5 w-full max-w-7xl"> Add Product </RouterLink>
                    </div>
                    <div v-if="productStore.products.length > 0" class="flex flex-wrap justify-center max-w-7xl w-full">
                        <div v-for="(product, index) in productStore.products" :key="index" class="relative bg-white shadow-md rounded-xl p-2 cursor-pointer m-6 flex-grow flex-shrink basis-[300px]">
                            <RouterLink :to="{ name: 'manager.products.detail', params: { id: product.id } }">
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
                    <div v-else>
                        <RouterLink class="inline-block mt-24 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.add' }">Add Product</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <PaginationComponent v-if="!isLoading" />
    </div>
</template>
