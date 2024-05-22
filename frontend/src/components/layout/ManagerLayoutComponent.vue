<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import ManagerSidebarComponent from './ManagerSidebarComponent.vue';
const router = useRoute();
const isHome = computed(() => router.name === 'home');
const managerProfile = computed(() => {
    const regex = /^\/management\/?.*/;
    return regex.test(router.path);
});

const managerLogin = computed(() => {
    return router.path === '/management/login';
});
</script>

<template>
    <div class="flex flex-row h-screen">
        <main class="flex flex-1">
            <ManagerSidebarComponent v-if="managerProfile && !managerLogin" />
            <RouterView class="flex-1 overflow-auto -ml-64 md:ml-0 sm:-ml-0 transition-all ease-in-out" />
        </main>
    </div>
</template>
