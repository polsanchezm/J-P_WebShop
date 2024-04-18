<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/client/order';
import { onBeforeMount } from 'vue';

const route = useRoute()

const orderId: string | string [] = route.params.id

const orderStore = useOrderStore();

onBeforeMount(async () => {
    await orderStore.userOrderDetail(orderId);
    console.log('orderDetail', orderStore.orderDetail);
});

</script>

<template>
    <div v-if="orderStore.orderDetail" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Order Detail</p>
        <div>
            <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ orderStore.orderDetail!.id }}</p>
            <p class="text-gray-700"><span class="font-semibold">Order ID:</span> {{ orderStore.orderDetail!.order_id }}</p>
            <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ orderStore.orderDetail!.variant_id }}</p>
            <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ orderStore.orderDetail!.quantity }}</p>
            <p class="text-gray-700"><span class="font-semibold">Purchase price:</span> {{ orderStore.orderDetail!.purchase_price }}</p>
            <button @click="orderStore.deleteUserOrder(orderStore.orderDetail!.order_id)"
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                Cancel order</button>
        </div>
    </div>
</template>

<style scoped>

</style>