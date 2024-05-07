<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { authService } from '@/services/auth/auth';
const authServ = authService();

onBeforeMount(async () => {
    await authServ.userDetail();
    if (typeof authServ.user.value!.birthdate === 'string') {
        authServ.user.value!.birthdate = new Date(authServ.user.value!.birthdate);
        authServ.user.value!.birthdate = authServ.user.value!.birthdate.toISOString().slice(0, 10);
    }
});
</script>

<template>
    <section v-if="authServ.user.value">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Edit details</h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="authServ.userEdit(authServ.user)">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="text" v-model="authServ.user.value!.name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="surnames" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surnames</label>
                            <input type="text" v-model="authServ.user.value!.surnames" name="surnames" id="surnames" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" v-model="authServ.user.value!.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>
                        <div class="flex flex-wrap -mx-3">
                            <div class="w-full px-3">
                                <!-- Añadido mb-6 para más espacio debajo del campo de contraseña actual -->
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                <input type="password" v-model="authServ.user.value!.currentPassword" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                            </div>
                            <div class="w-1/2 px-3 mt-6">
                                <!-- Añadido mt-6 para más espacio arriba -->
                                <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input type="password" v-model="authServ.user.value!.newPassword" name="new-password" id="new-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                            </div>
                            <div class="w-1/2 px-3 mt-6">
                                <!-- Añadido mt-6 para mantener la consistencia visual -->
                                <label for="confirm-new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                                <input type="password" v-model="authServ.user.value!.newPasswordConfirmation" name="confirm-new-password" id="confirm-new-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Edit details</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
