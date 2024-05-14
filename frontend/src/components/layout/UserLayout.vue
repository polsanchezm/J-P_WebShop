<script setup lang="ts">
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
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

<!-- <template>
    <div class="flex flex-row h-screen">
        <main class="flex flex-1">
            <SidebarComponent v-if="userProfile" />
            <RouterView class="flex-1 -ml-64 md:ml-0 sm:-ml-0 transition-all ease-in-out" />
        </main>
    </div>
</template> -->

<template>
    <div class="flex flex-row h-screen">
        <main class="flex flex-1">
            <SidebarComponent v-if="userProfile" />
            <RouterView class="flex-1 overflow-auto -ml-64 md:ml-0 sm:-ml-0 transition-all ease-in-out" />
        </main>
    </div>
</template>
