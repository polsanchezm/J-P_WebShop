<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <header>
            <NavbarComponent v-if="route.name != 'home'" />
        </header>
        <main class="mb-auto">
            <HeaderComponent v-if="route.name === 'home'" />
            <RouterView />
        </main>
        <footer>
            <FooterComponent />
        </footer>
    </div>
</template>
