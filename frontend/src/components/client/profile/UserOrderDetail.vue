<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import { orderService } from '@/services/client/order/order';
const orderServ = orderService();

const route = useRoute();

const paramId = route.params.id;
const orderId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    await orderServ.userOrderDetail(orderId);
    console.log('orderDetail', orderServ.orderDetail.value);
});
</script>

<template>
    <div v-if="orderServ.orderDetail.value" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24">
        <p class="text-lg font-semibold mb-2 text-gray-700">Order Detail</p>
        <ul>
            <li v-for="(orderDetail, index) in orderServ.orderDetail.value" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ orderDetail!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Order ID:</span> {{ orderDetail!.orderId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ orderDetail!.productVariant.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ orderDetail!.quantity }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ orderDetail!.productVariant.productId }}</p>
            </li>
        </ul>
        <button @click="orderServ.deleteUserOrder(orderId, true)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Cancel order</button>
    </div>
</template>

<style scoped></style>
