<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useShippingStore } from '@/stores/shipping/shipping';
const authStore = useAuthStore();
const shippingStore = useShippingStore();

onBeforeMount(async () => {
    await authStore.detailUser();
    console.log('user', authStore.user);
    await shippingStore.userShippings();
    console.log('shipping', shippingStore.shipping);
});
</script>

<template>
    <div class="flex flex-col w-full bg-gray-50 pt-10 items-center mt-16 min-h-screen">
        <div v-if="authStore.user" class="w-full">
            <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-8 w-full">
                <h2 class="text-3xl font-bold text-white text-center">Your Shipping Lines</h2>
            </div>
            <div class="flex justify-center my-4">
                <RouterLink :to="{ name: 'shipping.create' }" class="bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-white text-center py-4 px-5 w-full max-w-xs md:max-w-sm lg:max-w-md"> Add Shipping Line </RouterLink>
            </div>
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
</template>
