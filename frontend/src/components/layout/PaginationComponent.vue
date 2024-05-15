<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();

const pagination = computed(() => productStore.pagination);

const pages = computed(() => {
    const totalPages = pagination.value.lastPage;
    const currentPage = pagination.value.currentPage;
    const delta = 2;
    let range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
    }

    if (currentPage - delta > 2) {
        range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
        range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
        range.push(totalPages);
    }

    return range;
});

function goToFirstPage() {
    if (pagination.value.currentPage !== 1) {
        productStore.allProducts(pagination.value.perPage, 1);
    }
}

function goToLastPage() {
    const lastPage = pagination.value.lastPage;
    if (pagination.value.currentPage !== lastPage) {
        productStore.allProducts(pagination.value.perPage, lastPage);
    }
}

function goToPage(page: number | string) {
    if (typeof page === 'number') {
        productStore.allProducts(pagination.value.perPage, page);
    }
}
</script>

<template>
    <div class="flex justify-center items-center mt-5 space-x-4 pt-10 my-14">
        <button @click="goToFirstPage" :disabled="pagination.currentPage === 1" class="px-4 py-2 bg-gray-300 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors">&lt;&lt;</button>
        <span class="text-gray-700 flex items-center space-x-2">
            <button v-for="page in pages" :key="page" @click="goToPage(page)" :disabled="page === pagination.currentPage" class="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors">
                {{ page }}
            </button>
        </span>
        <button @click="goToLastPage" :disabled="pagination.currentPage === pagination.lastPage" class="px-4 py-2 bg-gray-300 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors">&gt;&gt;</button>
    </div>
</template>
