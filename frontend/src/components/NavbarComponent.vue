<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/client/auth';
const authStore = useAuthStore();

onMounted(() => {
    initFlowbite();
});
</script>

<template>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="flex items-center">
                <RouterLink class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                    :to="{ name: 'home' }">J & P
                </RouterLink>
            </div>

            <div class="flex items-center lg:order-2">
                <div v-if="authStore.isLoggedIn">
                    <RouterLink
                        class="gradient-button text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:-800"
                        :to="{ name: 'logout' }">Log out</RouterLink>
                    <RouterLink
                        class="gradient-button text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:-800"
                        :to="{ name: 'user.detail' }">Profile</RouterLink>
                </div>
                <div>
                    <RouterLink
                        class="login-button text-gray-800 dark:text-white hover:bg-gray-50 font-medium rounded-lg text-base px-6 py-3 lg:px-7 lg:py-3.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:bg-gray-800"
                        :to="{ name: 'login' }">Log in</RouterLink>

                    <RouterLink
                        class="gradient-button text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-base px-6 py-3 lg:px-7 lg:py-3.5 mr-2 dark:hover:bg-primary-700 focus:outline-none dark:bg-gray-800"
                        :to="{ name: 'register' }">Register</RouterLink>
                </div>


                <button data-collapse-toggle="mobile-menu-2" type="button"
                    class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none -200 dark:text-gray-400 dark:hover:bg-gray-700 dark:-600"
                    aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <RouterLink
                            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.login-button {
    background-image: linear-gradient(to right bottom, #7e22ce, #7628bd, #6e2dac, #67309b, #5f328a, #5e3189, #5d3088, #5c2f87, #612a95, #6524a4, #681cb3, #6c0ec2);
}
</style>