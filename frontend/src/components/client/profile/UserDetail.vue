<script setup lang="ts">
import { useUserStore } from '@/stores/client/user';
import { computed } from 'vue';

const userStore = useUserStore();
userStore.userDetail();
const user = computed(() => userStore.user)
</script>

<template>
    <div>
        <p>{{ user.id }}</p>
        <p>{{ user.name }}</p>
        <p>{{ user.surnames }}</p>
        <p>{{ user.birthdate }}</p>
        <p>{{ user.email }}</p>
    </div>
</template>

<style scoped>

</style>