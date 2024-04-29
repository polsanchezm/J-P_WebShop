<script setup lang="ts">
import { useProductStore } from '@/stores/product/product';
import { useProductManageStore } from '@/stores/manager/product';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { type ProductVariant } from '@/models/productVariant';

const route = useRoute();

const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

const productStore = useProductStore();
const productStoreManager = useProductManageStore();

onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    console.log('product', productStore.oneProductDetail);
    newVariant.product_id = productStore.oneProductDetail!.id;
});

let addVariantAreVisible = ref(false);
let editVariantAreVisible = ref(false);

const toggleAddVariant = () => {
    addVariantAreVisible.value = !addVariantAreVisible.value;
};

const toggleEditVariant = () => {
    editVariantAreVisible.value = !editVariantAreVisible.value;
};

const newVariant: ProductVariant = {
    id: 0,
    product_id: 0,
    size: 'XS',
    color: '',
    stock: 0
};
</script>

<template>
    <div v-if="productStore.oneProductDetail" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productStore.oneProductDetail!.id }}</p>
        <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ productStore.oneProductDetail!.name }}</p>
        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ productStore.oneProductDetail!.description }}</p>
        <p class="text-gray-700"><span class="font-semibold">Image:</span> {{ productStore.oneProductDetail!.image }}</p>
        <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ productStore.oneProductDetail!.price }}</p>
        <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ productStore.oneProductDetail!.category_id }}</p>

        <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="'/management/products/edit/' + productStore.oneProductDetail!.id">Edit</RouterLink>

        <button @click="productStoreManager.deleteProduct(productStore.oneProductDetail!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete</button>

        <button @click="toggleAddVariant" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
            {{ addVariantAreVisible ? 'Cancel' : 'Add Variant' }}
        </button>

        <div v-if="addVariantAreVisible">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                <form @submit.prevent="productStoreManager.addVariant(newVariant)">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="w-full">
                            <label for="product_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product ID</label>
                            <input type="number" name="product_id" v-model="newVariant.product_id" id="product_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required />
                        </div>
                        <div>
                            <label for="size" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                            <select id="size" v-model="newVariant.size" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                            <input type="text" name="color" v-model="newVariant.color" id="color" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Color" required />
                        </div>
                        <div>
                            <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">stock</label>
                            <input type="number" name="stock" v-model="newVariant.stock" id="stock" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required />
                        </div>
                    </div>

                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Add Variant</button>
                </form>
            </div>
        </div>

        <ul>
            <li v-if="productStore.productVariants" v-for="(productVariant, index) in productStore.productVariants" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productVariant!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant!.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant!.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant!.product_id }}</p>

                <button @click="toggleEditVariant" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    {{ editVariantAreVisible ? 'Cancel' : 'Edit Variant' }}
                </button>

                <button @click="productStoreManager.deleteVariant(productVariant!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete Variant</button>

                <div v-if="editVariantAreVisible">
                    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                        <form @submit.prevent="productStoreManager.updateVariant(productVariant!)">
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="w-full">
                                    <label for="product_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product ID</label>
                                    <input type="number" name="product_id" v-model="productVariant!.id" id="product_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required />
                                </div>
                                <div>
                                    <label for="size" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                    <select id="size" v-model="productVariant!.size" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                    <input type="text" name="color" v-model="productVariant!.color" id="color" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="color" required />
                                </div>
                                <div>
                                    <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">stock</label>
                                    <input type="number" name="stock" v-model="productVariant!.stock" id="stock" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required />
                                </div>
                            </div>

                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Edit Variant</button>
                        </form>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
