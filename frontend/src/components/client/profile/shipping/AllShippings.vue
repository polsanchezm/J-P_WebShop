<script setup lang="ts">
import { useAuthStore } from '@/stores/client/auth';
import { useShippingStore } from '@/stores/client/shipping';
import { onBeforeMount } from 'vue';
const authStore = useAuthStore();
const shippingStore = useShippingStore();

onBeforeMount(async () => {
    await authStore.userDetail();
    console.log('user', authStore.user);
    await shippingStore.shippingIndex();
    console.log('shipping', shippingStore.shipping);
});
</script>

<template>
    <div v-if="shippingStore.shipping.length > 0" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <ul>
            <li v-for="(shipping, index) in shippingStore.shipping" :key="index">
                <div v-if="shipping!.user_id === authStore.user!.id">
                    <p class="text-lg font-semibold mb-2 text-gray-700">Shipping Information {{ index + 1 }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User ID:</span> {{ shipping.user_id }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Phone:</span> {{ shipping.phone }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Street:</span> {{ shipping.street }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User unit:</span> {{ shipping.unit }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Apartment Number:</span> {{ shipping.apartment_number }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Country:</span> {{ shipping.country }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User City:</span> {{ shipping.city }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Other Instructions:</span> {{ shipping.other_instructions }}</p>
                    <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'shipping.edit', params: { id: shipping.id } }">Edit</RouterLink>
                    <button class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" @click="shippingStore.shippingDelete(shipping.id)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
    <div v-else class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'shipping.create' }">Create details</RouterLink>
    </div>
</template>
