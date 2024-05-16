<script setup lang="ts">
import NavbarComponent from '@/components/layout/NavbarComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const router = useRoute();
const isHome = computed(() => router.name === 'home');
const userProfile = computed(() => {
    const regex = /^\/user\/?.*/;
    return regex.test(router.path);
});
console.log('is home layout', isHome.value);
console.log(userProfile.value);
</script>

<template>
    <div class="flex flex-col h-screen">
        <header>
            <NavbarComponent v-if="!isHome" />
        </header>
        <main class="flex-1">
            <HeaderComponent v-if="isHome" />
            <RouterView />
        </main>
        <footer class="w-full">
            <FooterComponent />
        </footer>
    </div>
</template>
