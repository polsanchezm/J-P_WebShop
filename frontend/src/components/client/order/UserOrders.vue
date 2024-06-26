<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useOrderStore } from '@/stores/order/order';
import { useFormatDate } from '@/composables/formatDate';
const { formatDate } = useFormatDate();
const orderStore = useOrderStore();
const isLoading = ref(true);

// Carrega les comandes de l'usuari abans de renderitzar-les
onBeforeMount(async () => {
    await orderStore.userOrders();
    isLoading.value = false;
});
</script>

<template>
    <div class="flex flex-col w-full h-screen bg-gray-50 pt-[31px] items-center mt-20">
        <div class="bg-gray-400 dark:bg-gray-700 p-5 pt-6 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Your Orders</h2>
        </div>
        <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else class="flex flex-col w-full h-screen bg-gray-50 pt-8 items-center mt-16">
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
            <div v-else-if="orderStore.orders.length <= 0" class="flex flex-col w-full h-full items-center justify-center">
                <p class="text-lg font-semibold text-gray-800">No orders available</p>
            </div>
        </div>
    </div>
</template>
