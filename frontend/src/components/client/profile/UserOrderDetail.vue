<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/client/order';
import { onBeforeMount } from 'vue';

const route = useRoute();

const paramId = route.params.id;
const orderId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

const orderStore = useOrderStore();

onBeforeMount(async () => {
    await orderStore.userOrderDetail(orderId);
    console.log('orderDetail', orderStore.orderDetail);
});
</script>

<template>
    <div v-if="orderStore.orderDetail" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Order Detail</p>
        <ul>
            <li v-for="(orderDetail, index) in orderStore.orderDetail" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ orderDetail!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Order ID:</span> {{ orderDetail!.order_id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ orderDetail!.variant_id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ orderDetail!.quantity }}</p>
                <p class="text-gray-700"><span class="font-semibold">Purchase price:</span> {{ orderDetail!.purchase_price }}</p>
            </li>
        </ul>
        <button @click="orderStore.deleteUserOrder(orderId, true)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Cancel order</button>
    </div>
</template>

<style scoped></style>
