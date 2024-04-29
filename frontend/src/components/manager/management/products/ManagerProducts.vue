<script setup lang="ts">
import { useProductStore } from '@/stores/product/product';
import { onBeforeMount } from 'vue';

const productStore = useProductStore();

onBeforeMount(async () => {
    await productStore.allProducts();
    console.log('products', productStore.allProductsArray);
});
</script>

<template>
    <RouterLink class="inline-block mt-24 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.add' }">Add Product</RouterLink>

    <div v-if="productStore.allProductsArray" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Products</p>
        <ul>
            <li v-for="(product, index) in productStore.allProductsArray" :key="index">
                <!-- <img :src="product!.image" alt=""> -->
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ product!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ product!.name }}</p>
                <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ product!.description }}</p>
                <p class="text-gray-700"><span class="font-semibold">Image:</span> {{ product!.image }}</p>
                <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ product!.price }}</p>
                <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ product!.categoryId }}</p>

                <!-- <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/user/orders/detail/' + product.id">View details</RouterLink> -->
                <!-- <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="'/products/detail/' + product.id">View details</RouterLink> -->
                <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.detail', params: { id: product.id } }">View details</RouterLink>
                <!-- <button @click="cartStore.addToCart(product)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Remove</button> -->
            </li>
        </ul>
        <p v-if="productStore.allProductsArray.length === 0">No products available</p>
    </div>
</template>

<style scoped></style>
