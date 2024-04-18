<script setup lang="ts">
import type { User } from '@/models/user';
import { useAuthStore } from '@/stores/client/auth';
import { ref } from 'vue';
// import { useForm } from 'vee-validate';
// import * as yup from 'yup';
const authStore = useAuthStore();
const user = ref<User>({
    id: 0,
    name: '',
    surnames: '',
    birthdate: null,
    email: '',
    currentPassword: '',
    currentPasswordConfirmation: '',
    newPassword: '',
    newPasswordConfirmation: ''
});
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="authStore.userLogin(user)">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" v-model="user.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            <!-- <span class="text-red-500">{{ errors.email }}</span> -->
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" v-model="user.currentPassword" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <!-- <span class="text-red-500">{{ errors.password }}</span> -->
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet?
                            <RouterLink :to="{ name: 'register' }" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
