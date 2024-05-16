<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useShippingStore } from '@/stores/shipping/shipping';
const authStore = useAuthStore();
const shippingStore = useShippingStore();
const isLoading = ref(true);

// Carrega el detall de l'usuari i les seves dades d'enviament
onBeforeMount(async () => {
    await authStore.detailUser();
    console.log('user', authStore.user);
    await shippingStore.userShippings();
    isLoading.value = false;
    console.log('shipping', shippingStore.shipping);
});
</script>

<template>
    <div class="flex flex-col min-h-screen w-full bg-gray-50 pt-[23px] items-center mt-20">
        <div class="w-full">
            <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-8 w-full">
                <h2 class="text-3xl font-bold text-white text-center">Your Shipping Lines</h2>
            </div>
            <div class="flex justify-center my-4">
                <RouterLink :to="{ name: 'shipping.create' }" class="bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-white text-center py-4 px-5 w-full max-w-xs md:max-w-sm lg:max-w-md"> Add Shipping Line </RouterLink>
            </div>
            <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <div v-else-if="authStore.user">
                <div class="flex flex-wrap justify-center gap-4 py-3 my-3">
                    <div v-for="(shipping, index) in shippingStore.shipping" :key="index" class="bg-white shadow-xl rounded-xl p-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
                        <div class="space-y-2">
                            <div class="space-y-2">
                                <div class="space-y-2">
                                    <div class="bg-gray-200 p-2 rounded-lg">
                                        <p class="text-gray-700 text-lg text-center"><span class="font-semibold">Shipping Line:</span> {{ index + 1 }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">Phone Number:</span> {{ shipping.phone }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">Street:</span> {{ shipping.street }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">Unit:</span> {{ shipping.unit }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">Apartment Number:</span> {{ shipping.apartmentNumber }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">Country:</span> {{ shipping.country }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">City:</span> {{ shipping.city }}</p>
                                    </div>
                                    <div class="bg-gray-100 p-2 rounded-lg">
                                        <p class="text-gray-700 text-sm"><span class="font-semibold">Other Instructions:</span> {{ shipping.otherInstructions }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-around mt-4">
                            <RouterLink :to="{ name: 'shipping.edit', params: { id: shipping.id } }" class="py-2 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-base text-center w-1/3"> Edit </RouterLink>
                            <button v-if="authStore.user.role === 'client'" @click="shippingStore.deleteShipping(shipping.id)" class="py-2 text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 focus:outline-none font-medium rounded-lg text-base text-center w-1/3">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
