<template>
    <div class="flex items-center justify-center h-screen bg-red-100">
        <div class="text-center">
            <h1 class="text-2xl font-bold text-red-800 mb-4">Payment Cancelled</h1>
            <p class="text-red-600">It seems you've cancelled the payment process. If it was a mistake, you can try again.</p>
            <RouterLink :to="{ name: 'orders.all' }" class="mt-6 inline-block bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600"> Your Orders </RouterLink>
        </div>
    </div>
</template>
