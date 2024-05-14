<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useOrderStore } from '@/stores/order/order';
import { useFormatDate } from '@/composables/formatDate';
const { formatDate } = useFormatDate();
const orderStore = useOrderStore();

onBeforeMount(async () => {
    await orderStore.userOrders();
    console.log('orders', orderStore.orders);
});
</script>

<template>
    <div class="flex flex-col w-full h-screen bg-gray-50 pt-8 items-center mt-16">
        <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-10 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Your Orders</h2>
        </div>
        <div v-if="orderStore.orders && orderStore.orders.length > 0" class="flex flex-col w-full h-screen bg-gray-50 pt-12 items-center">
            <ul class="w-full max-w-4xl mx-auto px-4 md:px-20">
                <li v-for="order in orderStore.orders" :key="order.id" class="mb-4 p-4 md:p-10 bg-white rounded-lg shadow flex justify-between items-center">
                    <div class="flex-1 mr-4">
                        <h3 class="text-lg font-semibold">Order ID: #{{ order.id }}</h3>
                        <p class="text-sm text-gray-600">Date: {{ formatDate(order.createdAt) }}</p>
                    </div>
                    <RouterLink :to="{ name: 'orders.detail', params: { id: order.id } }" class="ml-4 md:ml-20 px-4 py-2 md:py-4 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-xl text-sm md:text-base text-center"> View details </RouterLink>
                </li>
            </ul>
        </div>
        <div v-else class="flex flex-col w-full h-full items-center justify-center">
            <p class="text-lg font-semibold text-gray-800">No orders available</p>
        </div>
    </div>
</template>
