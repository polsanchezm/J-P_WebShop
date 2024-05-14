<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();

// Carrega tots els productes abans de renderitzar-los
onBeforeMount(async () => {
    await productStore.allProducts();
    console.log('products', productStore.products);
});
</script>

<template>
    <RouterLink class="inline-block mt-24 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.add' }">Add Product</RouterLink>

    <div v-if="productStore.products" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Products</p>
        <ul>
            <li v-for="(product, index) in productStore.products" :key="index">
                <img v-if="product!.image" :src="product!.image" />
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ product!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ product!.name }}</p>
                <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ product!.description }}</p>
                <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ product!.price }}</p>
                <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ product!.categoryId }}</p>

                <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.detail', params: { id: product.id } }">View details</RouterLink>
            </li>
        </ul>
        <p v-if="productStore.products.length === 0">No products available</p>
    </div>
</template>
