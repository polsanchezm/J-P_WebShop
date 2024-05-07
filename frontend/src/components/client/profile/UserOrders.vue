<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { orderService } from '@/services/client/order/order';
const orderServ = orderService();

onBeforeMount(async () => {
    await orderServ.userOrders();
    console.log('orders', orderServ.orders.value);
});
</script>

<template>
    <div v-if="orderServ.orders.value" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24">
        <p class="text-lg font-semibold mb-2 text-gray-700">Orders</p>
        <ul>
            <li v-for="(order, index) in orderServ.orders.value" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ order!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">User ID:</span> {{ order!.userId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Date:</span> {{ order!.orderDate }}</p>

                <RouterLink class="gradient-button inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'orders.detail', params: { id: order.id } }">View details </RouterLink>
                <button @click="orderServ.deleteUserOrder(order!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Cancel order</button>
            </li>
        </ul>
        <p v-if="orderServ.orders.value.length === 0">No orders available</p>
    </div>
</template>

<style scoped></style>
