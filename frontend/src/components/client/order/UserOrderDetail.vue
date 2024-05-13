<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import { useOrderStore } from '@/stores/order/order';
const orderStore = useOrderStore();

const route = useRoute();

const paramId = route.params.id;
const orderId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    await orderStore.detailOrder(orderId);
    console.log('orderDetail', orderStore.oneOrder);
});
</script>

<template>
    <div v-if="orderStore.oneOrder" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24">
        <p class="text-lg font-semibold mb-2 text-gray-700">Order Detail</p>
        <ul>
            <li v-for="(oneOrder, index) in orderStore.oneOrder" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ oneOrder!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Order ID:</span> {{ oneOrder!.orderId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ oneOrder!.productVariant.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ oneOrder!.quantity }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ oneOrder!.productVariant.productId }}</p>
            </li>
        </ul>
        <button @click="orderStore.deleteOrder(orderId, true)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Cancel order</button>
    </div>
</template>

<style scoped></style>
