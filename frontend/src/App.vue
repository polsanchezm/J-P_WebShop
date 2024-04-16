<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNavbar from './components/MainNavbar.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/client/auth';
const authStore = useAuthStore();
onMounted(() => {
    authStore.checkTokenExpiry();
})

</script>

<template>
    <header>
        <div class="wrapper">
            <MainNavbar />
        </div>
    </header>

    <RouterView />
</template>
