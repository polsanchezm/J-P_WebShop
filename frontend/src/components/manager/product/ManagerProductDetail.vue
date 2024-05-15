<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();

const route = useRoute();
const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);
const isLoading = ref(true);
const selectedColor = ref('');
const selectedSize = ref('');

onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    isLoading.value = false;
    console.log('product', productStore.productDetail);
    console.log('product variants', productStore.productVariants);
    console.log('productId', productStore.productDetail!.id);
});

const formSchema = yup.object({
    color: yup
        .string()
        .required('Variant color is required.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ]+$/, 'Color can only contain letters.'),
    stock: yup
        .string()
        .required('Variant stock is required.')
        .matches(/^\d+$/, 'Variant stock must be a number')
        .test('is-within-range', 'Variant stock must be between 0 and 99', (value) => {
            const num = parseInt(value);
            return num >= 0 && num <= 99;
        })
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const handleCreate = handleSubmit((values) => {
    const productData = {
        color: values.color,
        stock: values.stock,
        size: values.size,
        productId: productId,
        id: 0,
        quantity: 0,
        productVariant: 0
    };
    console.log('component', productData);
    productStore.addVariant(productData);
});

const handleUpdate = handleSubmit((values) => {
    const productData = {
        color: values.color,
        stock: values.stock,
        size: values.size,
        id: editVariantId.value !== null ? editVariantId.value : 0,
        productId: productId,
        quantity: 0,
        productVariant: 0
    };
    console.log('component', productData);

    productStore.updateVariant(productData);
});

let addVariantAreVisible = ref(false);
let editVariantAreVisible = ref<number | null>(null);

const toggleAddVariant = () => {
    addVariantAreVisible.value = !addVariantAreVisible.value;
};

const editVariantId = ref(null);
const toggleEditVariant = (index: any, variantId: any) => {
    console.log(variantId);
    editVariantId.value = variantId;
    if (editVariantAreVisible.value === index) {
        editVariantAreVisible.value = null;
    } else {
        editVariantAreVisible.value = index;
    }
};

const isSizeAvailableForColor = (size: string, color: string) => {
    return productStore.productVariants.some((variant) => variant.size === size && variant.color === color && variant.stock! > 0);
};

watch(selectedColor, (newColor) => {
    if (!isSizeAvailableForColor(selectedSize.value, newColor)) {
        selectedSize.value = '';
    }
});

const uniqueColors = computed(() => {
    const colors = productStore.productVariants.map((variant) => variant.color);
    return [...new Set(colors)];
});

const uniqueSizes = computed(() => {
    const sizes = productStore.productVariants.map((variant) => variant.size);
    return [...new Set(sizes)];
});
</script>

<template>
    <div class="bg-gray-100 mt-20 pt-6 md:pt-6 lg:pt-3 md:pb-0 md:mb-0 min-h-screen">
        <div class="bg-gray-400 dark:bg-gray-700 pt-[23px] p-5 w-full">
            <h2 class="text-3xl font-bold text-white text-center">Product Detail</h2>
        </div>
        <main class="pt-20 pb-0 mb-0 items-center">
            <div class="container mx-auto px-6 pb-28">
                <!-- Loading Spinner -->
                <div v-if="isLoading" class="flex justify-center items-center h-full" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else>
                    <!-- Product Detail Section -->
                    <div v-if="productStore.productDetail">
                        <div class="md:flex md:items-center">
                            <!-- Product Image Section -->
                            <div class="w-full md:w-1/2">
                                <div class="relative pb-2/3">
                                    <img :src="productStore.productDetail.image" :alt="productStore.productDetail.name" class="w-full h-full object-contain rounded-xl" />
                                </div>
                            </div>
                            <!-- Product Details Section -->
                            <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                                <h3 class="text-gray-700 uppercase text-lg">{{ productStore.productDetail.name }}</h3>
                                <span class="text-gray-500 mt-3">{{ productStore.productDetail.price }}</span>
                                <p class="text-base text-gray-900">{{ productStore.productDetail.description }}</p>
                                <hr class="my-3" />
                                <!-- Color Selection -->
                                <div class="mt-3">
                                    <h3 class="text-sm font-medium text-gray-900 mb-6">Color</h3>
                                    <div class="flex items-center space-x-3">
                                        <div v-for="color in uniqueColors" :key="color" class="relative">
                                            <input type="radio" :id="'color-' + color" v-model="selectedColor" :value="color" class="hidden cursor-pointer h-7 w-7" />
                                            <label :for="'color-' + color" :class="['inline-block h-7 w-7 rounded-full cursor-pointer', selectedColor === color ? 'ring-2 ring-gray-700 ring-offset-2 ring-offset-white' : '']" :style="{ backgroundColor: color }"></label>
                                        </div>
                                    </div>
                                </div>
                                <!-- Size Selection -->
                                <div class="mt-3">
                                    <h3 class="text-sm font-medium text-gray-900 mb-6">Size</h3>
                                    <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        <div v-for="size in uniqueSizes" :key="size">
                                            <input type="radio" :id="'size-' + size" v-model="selectedSize" :value="size" :disabled="!isSizeAvailableForColor(size, selectedColor)" class="hidden" />
                                            <label :for="'size-' + size" :class="[!isSizeAvailableForColor(size, selectedColor) ? 'cursor-not-allowed bg-gray-50 text-gray-200' : 'cursor-pointer bg-white text-gray-900 shadow-sm', 'group flex items-center justify-center rounded-xl border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6', selectedSize === size ? 'ring-2 ring-gray-700 ring-offset-2 ring-offset-white' : '']">{{ size }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-4 mt-8 justify-center">
                        <RouterLink class="text-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-4 py-4 focus:outline-none" :to="{ name: 'manager.products.edit', params: { id: productStore.productDetail!.id } }">Edit Product</RouterLink>
                        <button @click="productStore.deleteProduct(productStore.productDetail!.id)" class="text-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-4 py-4 focus:outline-none">Delete Product</button>
                        <button @click="toggleAddVariant" class="text-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-4 py-4 focus:outline-none">
                            {{ addVariantAreVisible ? 'Cancel' : 'Add Variant' }}
                        </button>
                    </div>

                    <!-- Add Variant Form -->
                    <div v-if="addVariantAreVisible" class="mt-8 px-4 py-6">
                        <div class="bg-gray-50 dark:bg-corduroy-900 rounded-xl shadow">
                            <div class="p-6 space-y-6 sm:p-8">
                                <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Add Variant</h1>
                                <form class="max-w-md mx-auto" @submit.prevent="handleCreate">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <Field name="size" id="size" as="select" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                            <option :value="'XS'">XS</option>
                                            <option :value="'S'">S</option>
                                            <option :value="'M'">M</option>
                                            <option :value="'L'">L</option>
                                            <option :value="'XL'">XL</option>
                                        </Field>
                                        <label for="size" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant size</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <Field name="color" v-slot="{ field, meta }">
                                            <input type="text" id="color" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                            <label for="color" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant color</label>
                                            <ErrorMessage v-if="meta.touched && meta.dirty" name="color" class="text-red-500 text-xs mt-1" />
                                        </Field>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <Field name="stock" v-slot="{ field, meta }">
                                            <input type="text" id="stock" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                            <label for="stock" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant stock</label>
                                            <ErrorMessage v-if="meta.touched && meta.dirty" name="stock" class="text-red-500 text-xs mt-1" />
                                        </Field>
                                    </div>
                                    <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Add Variant</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Product Variants List -->
                    <div v-if="productStore.productVariants.length > 0" class="mt-8">
                        <h2 class="text-center text-xl font-bold text-gray-700 mb-4">Product Variants</h2>
                        <ul class="flex flex-wrap gap-4 justify-center">
                            <li v-for="(productVariant, index) in productStore.productVariants" :key="index" class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 w-96">
                                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productVariant.id }}</p>
                                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant.size }}</p>
                                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant.stock }}</p>
                                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant.productId }}</p>
                                <div class="flex items-center justify-center gap-4 mt-4">
                                    <button @click="toggleEditVariant(index, productVariant.id)" class="text-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-8 py-4 focus:outline-none">
                                        {{ editVariantAreVisible === index ? 'Cancel' : 'Edit' }}
                                    </button>
                                    <button @click="productStore.deleteVariant(productVariant.id)" class="text-center text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-8 py-4 focus:outline-none">Delete</button>
                                </div>

                                <div v-if="editVariantAreVisible === index" class="mt-8 px-4 py-6">
                                    <div class="bg-gray-50 dark:bg-corduroy-900 rounded-xl shadow w-full max-w-2xl mx-auto">
                                        <div class="p-6 space-y-6 sm:p-8">
                                            <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Edit Variant</h1>
                                            <form class="max-w-lg mx-auto" @submit.prevent="handleUpdate">
                                                <div class="relative z-0 w-full mb-5 group">
                                                    <Field name="size" id="size" as="select" v-model="productVariant.size" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                                        <option :value="'XS'">XS</option>
                                                        <option :value="'S'">S</option>
                                                        <option :value="'M'">M</option>
                                                        <option :value="'L'">L</option>
                                                        <option :value="'XL'">XL</option>
                                                    </Field>
                                                    <label for="size" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant size</label>
                                                </div>
                                                <div class="relative z-0 w-full mb-5 group">
                                                    <Field name="color" v-slot="{ field, meta }" v-model="productVariant.color">
                                                        <input type="text" id="color" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                                        <label for="color" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant color</label>
                                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="color" class="text-red-500 text-xs mt-1" />
                                                    </Field>
                                                </div>
                                                <div class="relative z-0 w-full mb-5 group">
                                                    <Field name="stock" v-slot="{ field, meta }" v-model="productVariant.stock">
                                                        <input type="text" id="stock" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                                        <label for="stock" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant stock</label>
                                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="stock" class="text-red-500 text-xs mt-1" />
                                                    </Field>
                                                </div>
                                                <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Edit Variant</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
