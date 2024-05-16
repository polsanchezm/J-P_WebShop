<script setup lang="ts">
import ProductSearchComponent from '@/components/layout/ProductSearchComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const showProductSearch = computed(() => {
    const regex = /^\/products\/?.*/;
    return regex.test(route.path);
});
</script>

<template>
    <div class="flex flex-col h-screen">
        <main class="flex-1 overflow-auto">
            <ProductSearchComponent v-if="showProductSearch" />
            <RouterView />
        </main>
    </div>
</template>
