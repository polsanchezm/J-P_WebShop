<script setup lang="ts"></script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-lg bg-gray-50 dark:bg-corduroy-900 rounded-xl shadow md:mt-0 sm:max-w-lg xl:p-0">
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Management options</h1>
                    <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.all' }">Products</RouterLink>
                    <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.orders' }">Orders</RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
