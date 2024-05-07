<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
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
            <RouterView />
        </main>
        <footer>
            <FooterComponent />
        </footer>
    </div>
</template>
