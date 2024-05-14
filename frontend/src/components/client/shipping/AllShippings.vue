<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useShippingStore } from '@/stores/shipping/shipping';
const authStore = useAuthStore();
const shippingStore = useShippingStore();

// Carrega el detall de l'usuari i les seves dades d'enviament
onBeforeMount(async () => {
    await authStore.detailUser();
    console.log('user', authStore.user);
    await shippingStore.userShippings();
    console.log('shipping', shippingStore.shipping);
});
</script>

<template>
    <div v-if="shippingStore.shipping.length > 0" class="max-w-md mx-auto mt-24 bg-white shadow-md rounded-xl px-4 py-6">
        <ul>
            <li v-for="(shipping, index) in shippingStore.shipping" :key="index">
                <div v-if="shipping!.userId === authStore.user!.id">
                    <p class="text-lg font-semibold mb-2 text-gray-700">Shipping Information {{ index + 1 }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User ID:</span> {{ shipping.userId }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Phone:</span> {{ shipping.phone }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Street:</span> {{ shipping.street }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User unit:</span> {{ shipping.unit }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Apartment Number:</span> {{ shipping.apartmentNumber }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Country:</span> {{ shipping.country }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User City:</span> {{ shipping.city }}</p>
                    <p class="text-gray-700"><span class="font-semibold">User Other Instructions:</span> {{ shipping.otherInstructions }}</p>
                    <RouterLink class="gradient-button inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'shipping.edit', params: { id: shipping.id } }">Edit</RouterLink>
                    <button class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" @click="shippingStore.deleteShipping(shipping.id)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
    <div v-else class="max-w-md mx-auto mt-24 bg-white shadow-md rounded-xl px-4 py-6">
        <RouterLink class="gradient-button inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'shipping.create' }">Create details</RouterLink>
    </div>
</template>
