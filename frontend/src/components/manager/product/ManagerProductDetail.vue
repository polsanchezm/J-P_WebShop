<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();

const route = useRoute();
const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    // await productStore.oneProduct(productId, editVariantId.value);
    await productStore.oneProduct(productId);
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
</script>

<template>
    <div v-if="productStore.productDetail" class="max-w-md mx-auto bg-white shadow-md rounded-xl px-4 py-6">
        <img v-if="productStore.productDetail!.image" :src="productStore.productDetail!.image" />
        <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productStore.productDetail!.id }}</p>
        <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ productStore.productDetail!.name }}</p>
        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ productStore.productDetail!.description }}</p>
        <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ productStore.productDetail!.price }}</p>
        <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ productStore.productDetail!.categoryId }}</p>

        <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.edit', params: { id: productStore.productDetail!.id } }">Edit </RouterLink>

        <button @click="productStore.deleteProduct(productStore.productDetail!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete</button>

        <button @click="toggleAddVariant" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
            {{ addVariantAreVisible ? 'Cancel' : 'Add Variant' }}
        </button>

        <div v-if="addVariantAreVisible" class="px-4 py-6">
            <div class="bg-gray-50 dark:bg-corduroy-900 rounded-xl shadow">
                <div class="p-6 space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Add variant</h1>
                    <form class="max-w-md mx-auto" @submit.prevent="handleCreate">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="size" id="size" as="select" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                <option :value="'XS'">XS</option>
                                <option :value="'S'">S</option>
                                <option :value="'M'">M</option>
                                <option :value="'L'">L</option>
                                <option :value="'XL'">XL</option>
                            </Field>
                            <label for="size" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant size</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="color" v-slot="{ field, meta }">
                                <input type="text" id="color" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="color" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant color</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="color" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="stock" v-slot="{ field, meta }">
                                <input type="text" id="stock" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="stock" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant stock</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="stock" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Add Variant</button>
                    </form>
                </div>
            </div>
        </div>

        <ul v-if="productStore.productVariants">
            <li v-for="(productVariant, index) in productStore.productVariants" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productVariant!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant!.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant!.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant!.productId }}</p>

                <button @click="toggleEditVariant(index, productVariant.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    {{ editVariantAreVisible === index ? 'Cancel' : 'Edit Variant' }}
                </button>

                <button @click="productStore.deleteVariant(productVariant!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete Variant</button>

                <div v-if="editVariantAreVisible === index" class="px-4 py-6">
                    <div class="bg-gray-50 dark:bg-corduroy-900 rounded-xl shadow">
                        <div class="p-6 space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Edit variant</h1>
                            <form class="max-w-md mx-auto" @submit.prevent="handleUpdate">
                                <div class="relative z-0 w-full mb-5 group">
                                    <Field name="size" id="size" as="select" v-model="productVariant!.size" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                        <option :value="'XS'">XS</option>
                                        <option :value="'S'">S</option>
                                        <option :value="'M'">M</option>
                                        <option :value="'L'">L</option>
                                        <option :value="'XL'">XL</option>
                                    </Field>
                                    <label for="size" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant size</label>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <Field name="color" v-slot="{ field, meta }" v-model="productVariant!.color">
                                        <input type="text" id="color" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label for="color" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant color</label>
                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="color" class="text-red-500 text-xs mt-1" />
                                    </Field>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <Field name="stock" v-slot="{ field, meta }" v-model="productVariant!.stock">
                                        <input type="text" id="stock" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label for="stock" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant stock</label>
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
</template>
