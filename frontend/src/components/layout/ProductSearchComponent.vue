<script setup lang="ts">
import { useProductStore } from '@/stores/product/product';
import { ref } from 'vue';

const productStore = useProductStore();

const searchTerm = ref('');

const handleSearch = async () => {
    await productStore.searchProducts({ search: searchTerm.value });
};
</script>

<template>
    <div class="bg-gray-50 mt-24 pt-8 pb-12">
        <form class="max-w-md mx-auto pt-6" @submit.prevent="handleSearch">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="searchTerm" type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-500 focus:ring-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-500" placeholder="Search Products by Color, Size or Category" required />
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700">Search</button>
            </div>
        </form>
    </div>
</template>
