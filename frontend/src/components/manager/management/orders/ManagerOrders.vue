<script setup lang="ts">
import { orderManagementService } from '@/services/manager/order/order';
import { onBeforeMount } from 'vue';

const managerOrderServ = orderManagementService();

onBeforeMount(async () => {
    await managerOrderServ.Orders();
    console.log('orders', managerOrderServ.allOrders.value);
});
</script>

<template>
    <div v-if="managerOrderServ.allOrders.value" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-32">
        <p class="text-lg font-semibold mb-2 text-gray-700">Orders</p>
        <ul>
            <li v-for="(order, index) in managerOrderServ.allOrders.value" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ order!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">User ID:</span> {{ order!.userId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Date:</span> {{ order!.orderDate }}</p>

                <button @click="managerOrderServ.deleteOrder(order!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete Order</button>
            </li>
        </ul>
        <p v-if="managerOrderServ.allOrders.value.length === 0">No orders available</p>
    </div>
</template>

<style scoped></style>
