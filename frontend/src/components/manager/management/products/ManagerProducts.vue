<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { productService } from '@/services/client/product/product';

const productServ = productService();

onBeforeMount(async () => {
    await productServ.allProducts();
    console.log('products', productServ.allProductsArray.value);
});
</script>

<template>
    <RouterLink
        class="inline-block mt-24 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
        :to="{ name: 'manager.products.add' }">Add Product</RouterLink>

    <div v-if="productServ.allProductsArray.value" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">Products</p>
        <ul>
            <li v-for="(product, index) in productServ.allProductsArray.value" :key="index">
                <img v-if="product!.image" :src="product!.image" />
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ product!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ product!.name }}</p>
                <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ product!.description }}</p>
                <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ product!.price }}</p>
                <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ product!.categoryId }}</p>

                <RouterLink
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    :to="{ name: 'manager.products.detail', params: { id: product.id } }">View details</RouterLink>
            </li>
        </ul>
        <p v-if="productServ.allProductsArray.value.length === 0">No products available</p>
    </div>
</template>