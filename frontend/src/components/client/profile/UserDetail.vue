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
    <div class="flex flex-col w-full h-dvh bg-gray-50 pt-10 items-center mt-16">
        <div v-if="authStore.user" class="w-full">
            <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-8 w-full">
                <h2 class="text-3xl font-bold text-white text-center">Your Profile</h2>
            </div>
            <div class="flex flex-col items-center p-6 w-full mt-6">
                <div class="space-y-4 w-full max-w-2xl">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-gray-700 text-base"><span class="font-semibold">Name:</span> {{ authStore.user.name }}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-gray-700 text-base"><span class="font-semibold">Surnames:</span> {{ authStore.user.surnames }}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-gray-700 text-base"><span class="font-semibold">Birthdate:</span> {{ formatDate(authStore.user.birthdate) }}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-gray-700 text-base"><span class="font-semibold">Email:</span> {{ authStore.user.email }}</p>
                    </div>
                </div>
                <div class="mt-6 flex justify-around w-full max-w-2xl">
                    <RouterLink :to="{ name: 'user.edit' }" class="w-1/3 py-4 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-base px-5 text-center">Edit</RouterLink>
                    <button v-if="authStore.user.role === 'client'" @click="authStore.deleteUser()" class="w-1/3 py-4 text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 focus:outline-none font-medium rounded-lg text-base px-5 text-center">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
