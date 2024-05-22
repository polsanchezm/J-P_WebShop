<script setup lang="ts">
import UserSidebarComponent from '@/components/layout/UserSidebarComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import ManagerSidebarComponent from './ManagerSidebarComponent.vue';
const router = useRoute();
const authStore = useAuthStore();

const userProfile = computed(() => {
    const regex = /^\/user\/?.*/;
    return regex.test(router.path);
});
</script>

<template>
    <div class="flex flex-row h-screen">
        <main class="flex flex-1">
            <div v-if="authStore.userRole == 'client'">
                <UserSidebarComponent v-if="userProfile" />
            </div>
            <div v-else-if="authStore.userRole == 'manager'">
                <ManagerSidebarComponent />
            </div>
            <RouterView class="flex-1 overflow-auto -ml-64 md:ml-0 sm:-ml-0 transition-all ease-in-out" />
        </main>
    </div>
</template>
