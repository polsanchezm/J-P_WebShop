<script setup lang="ts">
import { useAuthStore } from '@/stores/client/auth';

const authStore = useAuthStore();
authStore.userLogout();
</script>

<template>
    <div></div>
</template>
