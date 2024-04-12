<script setup lang="ts">
import { useUserStore } from '@/stores/client/user';

const userStore = useUserStore();
userStore.userLogout();
</script>

<template>
    <div></div>
</template>
