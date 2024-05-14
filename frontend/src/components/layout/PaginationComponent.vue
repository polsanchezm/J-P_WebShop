<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();

const pagination = computed(() => productStore.pagination);

const pages = computed(() => {
    const totalPages = pagination.value.lastPage;
    const currentPage = pagination.value.currentPage;
    const delta = 2; // Number of pages to show before/after the current page
    let range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
    }

    if (currentPage - delta > 2) {
        range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
        range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
        range.push(totalPages);
    }

    return range;
});

function prevPage() {
    if (pagination.value.prevPageUrl) {
        const page = new URL(pagination.value.prevPageUrl).searchParams.get('page');
        productStore.allProducts(pagination.value.perPage, Number(page));
    }
}

function nextPage() {
    if (pagination.value.nextPageUrl) {
        const page = new URL(pagination.value.nextPageUrl).searchParams.get('page');
        productStore.allProducts(pagination.value.perPage, Number(page));
    }
}

function goToPage(page: number | string) {
    if (typeof page === 'number') {
        productStore.allProducts(pagination.value.perPage, page);
    }
}
</script>


<template>
    <div class="pagination flex justify-center items-center space-x-4 pt-10 my-14">
        <button @click="prevPage" :disabled="!pagination.prevPageUrl"
            class="px-4 py-2 bg-gray-300 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors">
            &lt;
        </button>
        <span class="text-gray-700 flex items-center space-x-2">
            <button v-for="page in pages" :key="page" @click="goToPage(page)"
                :disabled="page === pagination.currentPage"
                class="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors">
                {{ page }}
            </button>
        </span>
        <button @click="nextPage" :disabled="!pagination.nextPageUrl"
            class="px-4 py-2 bg-gray-300 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors">
            &gt;
        </button>
    </div>
</template>


<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 5px;
}
</style>
