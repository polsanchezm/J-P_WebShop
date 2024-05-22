<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { useOrderStore } from '@/stores/order/order';
const orderStore = useOrderStore();
const isLoading = ref(true);
const route = useRoute();

// Agafa la ID de la comanda de la URL
const paramId = route.params.id;
const orderId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

// Carrega els detalls de la comanda abans de renderitzar-les
onBeforeMount(async () => {
    await orderStore.detailOrder(orderId);
    isLoading.value = false;
});
</script>

<template>
    <div class="flex flex-col w-full h-screen bg-gray-50 pt-4 items-center min-h-screen mt-[79px]">
        <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-10 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Order Details</h2>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else class="flex flex-col w-full bg-gray-50 pt-8 items-center min-h-screen mt-16">
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
    </div>
</template>
