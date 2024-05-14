<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import { useOrderStore } from '@/stores/order/order';
import { useFormatDate } from '@/composables/formatDate';
const orderStore = useOrderStore();
const { formatDate } = useFormatDate();

const route = useRoute();

const paramId = route.params.id;
const orderId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    await orderStore.detailOrder(orderId);
    console.log('orderDetail', orderStore.oneOrder);
});
</script>

<template>
    <!-- <div v-if="orderStore.oneOrder" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24"> -->
    <!-- <div v-if="orderStore.oneOrder" class="flex flex-col w-full h-screen bg-gray-50 pt-8 items-center mt-16">
        <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-10 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Order Detail</h2>
        </div>
        <ul>
            <li v-for="(oneOrder, index) in orderStore.oneOrder" :key="index">
                <p class="text-gray-700"><span class="font-semibold">Order ID:</span> {{ oneOrder!.orderId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ oneOrder!.productVariant.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ oneOrder!.quantity }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ oneOrder!.product.id }}</p>
            </li>
        </ul>
        <button @click="orderStore.deleteOrder(orderId, true)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Cancel order</button>
    </div> -->

    <div class="flex flex-col w-full bg-gray-50 pt-8 items-center min-h-screen mt-16">
        <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-10 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Order Details</h2>
        </div>
        <div v-if="orderStore.oneOrder.length > 0" class="bg-white shadow-xl rounded-xl p-6 my-10 mx-5 xl:w-full max-w-4xl">
            <h3 class="text-xl font-semibold mb-3 py-3">Order ID: #{{ orderStore.oneOrder[0].orderId }}</h3>
            <table class="w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 text-center">
                        <th class="p-2">Product</th>
                        <th class="p-2">Quantity</th>
                        <th class="p-2">Size</th>
                        <th class="p-2">Color</th>
                        <th class="p-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="oneItem in orderStore.oneOrder" :key="oneItem.id" class="text-center">
                        <td class="p-2 flex items-center space-x-3">
                            <img :src="oneItem.product.image" :alt="oneItem.product.description" class="h-12 w-12 rounded" />
                            <span>{{ oneItem.product.name }}</span>
                        </td>
                        <td class="p-2">{{ oneItem.quantity }}</td>
                        <td class="p-2">{{ oneItem.productVariant.size }}</td>
                        <td class="p-2">{{ oneItem.productVariant.color }}</td>
                        <td class="p-2">{{ oneItem.product.price }}€</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-4 flex justify-between items-center">
                <h2 class="text-lg font-bold">Total Price: {{ orderStore.oneOrder[0].totalPrice }}€</h2>
                <button @click="orderStore.deleteOrder(orderStore.oneOrder[0].orderId, true)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Cancel Order</button>
            </div>
        </div>
    </div>
</template>
