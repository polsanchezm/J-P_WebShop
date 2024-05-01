<script setup lang="ts">
import { ref } from 'vue';
import { type Product } from '@/models/product';
import { useProductManageStore } from '@/stores/manager/product';

const productStore = useProductManageStore();

let product = ref<Product>({
    id: 0,
    name: '',
    description: '',
    image: '',
    price: '',
    categoryId: 0,
    productVariants: [],
    quantity: 1,
    wishlistId: 0
});

let imageUrl: any = ref(null);

const insertedFile = (e: any) => {
    product.value.image = e.target.files[0];
    imageUrl.value = URL.createObjectURL(e.target.files[0]);
};
</script>

<template>
    <div class="mt-28">
        <form @submit.prevent="productStore.addProduct(product)" enctype="multipart/form-data" class="max-w-md mx-auto">
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="name" v-model="product.name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Product Name</label>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Product description</label>
                <textarea id="message" rows="4" v-model="product.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            </div>

            <div id="preview">
                <img v-if="imageUrl" :src="imageUrl" />
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input type="file" accept="image/*" v-on:change="insertedFile" name="image" id="image" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="image" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Product image</label>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="price" id="price" v-model="product.price" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Product Price</label>
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category product</label>
                <select id="categories" v-model="product.categoryId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option :value="1" selected>Top</option>
                    <option :value="2">Bottom</option>
                    <option :value="3">Underwear</option>
                    <option :value="4">Footwear</option>
                </select>
            </div>

            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </div>
</template>

<style scoped></style>
