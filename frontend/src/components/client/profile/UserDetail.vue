<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useFormatDate } from '@/composables/formatDate';
const { formatDate } = useFormatDate();
const authStore = useAuthStore();
const isLoading = ref(true);

onBeforeMount(async () => {
    await authStore.detailUser();
    isLoading.value = false;
    console.log('user', authStore.user);
});
</script>

<template>
    <div class="flex flex-col w-full h-dvh bg-gray-50 md:pt-14 lg:pt-12 pt-16 items-center mt-10">
        <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-8 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Your Profile</h2>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else class="flex flex-col w-full h-dvh bg-gray-50 pt-10 items-center mt-16">
            <div v-if="authStore.user" class="w-full">
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
                    <div v-if="authStore.user.role === 'client'" class="mt-6 flex justify-around w-full max-w-2xl">
                        <RouterLink :to="{ name: 'user.edit' }" class="mr-3 w-1/3 py-4 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-base px-5 text-center transition-colors">Edit</RouterLink>
                        <button class="mx-3 w-1/3 py-4 text-white bg-neutral-800 hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-300 font-medium rounded-lg text-base px-5 text-center transition-colors" @click="authStore.logoutUser()">Logout</button>
                        <button @click="authStore.deleteUser()" class="ml-3 w-1/3 py-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none font-medium rounded-lg text-base px-5 text-center transition-colors">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
