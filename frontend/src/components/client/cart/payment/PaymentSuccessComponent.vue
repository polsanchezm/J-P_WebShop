<script setup lang="ts">
import { useCartStore } from '@/stores/client/cart';
import { onMounted } from 'vue';
const cartStore = useCartStore();
onMounted(async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get('session_id');
    console.log(sessionId);
    
    const payment = cartStore.paymentInfo(sessionId);
    console.log('payment', payment);
});
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-green-100">
        <div class="text-center">
            <h1 class="text-2xl font-bold text-green-800 mb-4">Payment Successfully Completed</h1>
            <p class="text-green-600">Thank you for your purchase! Your order is being processed.</p>
            <RouterLink :to="{ name: 'orders.all' }" class="mt-6 inline-block bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600"> View Your Orders </RouterLink>
        </div>
    </div>
</template>
