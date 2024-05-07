<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { productService } from '@/services/client/product/product';
import { productManagementService } from '@/services/manager/product/product';

const productServ = productService();
const managerProductServ = productManagementService();

const route = useRoute();
const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    await productServ.oneProduct(productId);
    console.log('product', productServ.oneProductDetail);
});

let imageUrl: any = ref(null);

const insertedFile = (e: any) => {
    productServ.oneProductDetail.value!.image = e.target.files[0];
    imageUrl.value = URL.createObjectURL(e.target.files[0]);
};
</script>

<template>
    <div v-if="productServ.oneProductDetail.value!" class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
        <form @submit.prevent="managerProductServ.updateProduct(productServ.oneProductDetail.value!)" enctype="multipart/form-data">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" name="name" v-model="productServ.oneProductDetail.value!.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                </div>
                <div class="w-full">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Product Price</label>
                    <input type="number" name="price" v-model="productServ.oneProductDetail.value!.price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                </div>
                <div>
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
                    <select id="category" v-model="productServ.oneProductDetail.value!.categoryId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option :value="1">Top</option>
                        <option :value="2">Bottom</option>
                        <option :value="3">Underwear</option>
                        <option :value="4">Footwear</option>
                    </select>
                </div>

                <!-- Saved image: -->
                <img v-if="productServ.oneProductDetail.value!.image && !imageUrl" :src="productServ.oneProductDetail.value!.image" />
                <!-- Preview new image: -->
                <img v-if="imageUrl" :src="imageUrl" />

                <div class="sm:col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                    <input type="file" accept="image/*" v-on:change="insertedFile" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                </div>
                <div class="sm:col-span-2">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <textarea id="description" v-model="productServ.oneProductDetail.value!.description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                </div>
            </div>
            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Update product</button>
        </form>
    </div>
</template>

<style scoped></style>
