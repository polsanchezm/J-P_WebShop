<script setup lang="ts">
import { useAuthStore } from '@/stores/client/auth';
import { onBeforeMount } from 'vue';
const authStore = useAuthStore();

onBeforeMount(async () => {
    await authStore.userDetail();
    console.log('user', authStore.user);
});

const formatDate = (date: string | Date | null): string => {
    if (date === null) {
        return 'Date not provided';
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return new Intl.DateTimeFormat(navigator.language, { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};
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
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                to="/user/edit">Edit</RouterLink>
        </div>
    </div>
</template>
