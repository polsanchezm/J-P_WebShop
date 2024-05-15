<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
const authServ = useAuthStore();

onMounted(() => {
    initFlowbite();
});
</script>

<template>
    <nav class="bg-gray-700 dark:bg-gray-900 lg:px-16 px-8 py-8 z-50 fixed w-full">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="flex items-center w-1/3">
                <RouterLink class="self-center text-xl font-semibold whitespace-nowrap text-neutral-100 dark:text-neutral-200 hover:scale-125 transition-all" :to="{ name: 'home' }">J &amp; P</RouterLink>
            </div>

            <div class="flex flex-1 lg:flex-none justify-end lg:order-2 w-1/3 items-center">
                <div v-if="!authServ.isLoggedIn">
                    <RouterLink class="text-neutral-100 bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-100 dark:hover:text-neutral-800 transition-colors font-medium rounded-xl text-base px-6 py-3 lg:px-7 lg:py-3.5 mr-2 focus:outline-none" :to="{ name: 'login' }">Login</RouterLink>
                    <RouterLink class="text-neutral-800 bg-neutral-100 hover:bg-neutral-800 hover:text-neutral-100 dark:text-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors font-medium rounded-xl text-base px-6 py-3 lg:px-7 lg:py-3.5 mr-2 focus:outline-none" :to="{ name: 'register' }">Register</RouterLink>
                </div>
                <RouterLink :to="{ name: 'cart' }" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <svg class="w-8 h-8 text-gray-400 dark:text-gray-400 hover:text-gray-50 self-center text-xl font-semibold whitespace-nowrap hover:scale-125 transition-all" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                    </svg>
                </RouterLink>

                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-xl lg:hidden hover:bg-gray-100 focus:outline-none -200 dark:text-gray-400 dark:hover:bg-gray-700 dark:-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col font-medium lg:flex-row lg:space-x-8">
                    <li>
                        <RouterLink class="block text-neutral-100 hover:text-neutral-300 dark:text-neutral-300 dark:hover:text-neutral-50 transition-all" :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="block text-neutral-100 hover:text-neutral-300 dark:text-neutral-300 dark:hover:text-neutral-50 transition-all" :to="{ name: 'products' }">Products</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="block text-neutral-100 hover:text-neutral-300 dark:text-neutral-300 dark:hover:text-neutral-50 transition-all" :to="{ name: 'user.detail' }">Profile</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
