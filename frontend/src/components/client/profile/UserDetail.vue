<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useFormatDate } from '@/composables/formatDate';
const { formatDate } = useFormatDate();
const authStore = useAuthStore();

onBeforeMount(async () => {
    await authStore.detailUser();
    console.log('user', authStore.user);
});
</script>

<template>
    <div v-if="authStore.user" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">User Information</p>
        <div>
            <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ authStore.user!.id }}</p>
            <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ authStore.user!.name }}</p>
            <p class="text-gray-700"><span class="font-semibold">Surnames:</span> {{ authStore.user!.surnames }}</p>
            <p class="text-gray-700"><span class="font-semibold">Birthdate:</span> {{
                formatDate(authStore.user!.birthdate) }}</p>
            <p class="text-gray-700"><span class="font-semibold">Email:</span> {{ authStore.user!.email }}</p>
            <RouterLink
                class="gradient-button inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="{ name: 'user.edit' }">Edit</RouterLink>
            <button v-if="authStore.user.role === 'client'" @click="authStore.deleteUser()"
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete</button>
        </div>
    </div>
</template>
