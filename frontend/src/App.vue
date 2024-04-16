<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNavbar from './components/MainNavbar.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/client/user';
const userStore = useUserStore();
onMounted(() => {
    userStore.checkTokenExpiry();
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
