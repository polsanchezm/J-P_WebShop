<script setup lang="ts">
import NavbarComponent from '@/components/layout/NavbarComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import ProductsView from '@/views/client/product/ProductsView.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const router = useRoute();
const isHome = computed(() => router.name === 'home');
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <header>
            <NavbarComponent v-if="!isHome" />
        </header>
        <main class="mb-auto">
            <HeaderComponent v-if="isHome" />
            <ProductsView v-if="isHome" />
            <RouterView />
        </main>
        <footer>
            <FooterComponent />
        </footer>
    </div>
</template>
