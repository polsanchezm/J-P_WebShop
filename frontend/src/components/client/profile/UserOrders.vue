<script setup lang="ts">
import { useOrderStore } from '@/stores/client/order';
import { onBeforeMount } from 'vue';

const orderStore = useOrderStore();

onBeforeMount(async () => {
    await orderStore.userOrders();
    console.log('orders', orderStore.orders);
});
</script>

<template>
    <div v-if="orderStore.orders" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Orders</p>
        <ul>
            <li v-for="(order, index) in orderStore.orders" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ order!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">User ID:</span> {{ order!.user_id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Date:</span> {{ order!.order_date }}</p>

                <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/user/orders/detail/' + order.id">View details</RouterLink>
                <button @click="orderStore.deleteUserOrder(order!.id)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Cancel order</button>
            </li>
        </ul>
        <p v-if="orderStore.orders.length === 0">No orders available</p>
    </div>
</template>

<style scoped>

</style>