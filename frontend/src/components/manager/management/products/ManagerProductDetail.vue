<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { productService } from '@/services/client/product/product';
import { productManagementService } from '@/services/manager/product/product';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const productServ = productService();
const managerProductServ = productManagementService();

const route = useRoute();
const paramId = route.params.id;
const productId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);

onBeforeMount(async () => {
    await productServ.oneProduct(productId);
    // console.log('product', productServ.oneProductDetail.value);
});

const formSchema = yup.object({
    color: yup
        .string()
        .required('Variant color is required.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ]+$/, 'Color can only contain letters.'),
    stock: yup.number().required('Variant stock is required.').integer('Variant stock must be an integer.').min(0, 'Variant stock cannot be less than 0.').max(99, 'Variant stock cannot be more than 99.').typeError('Product stock must be a number')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const createVariant = handleSubmit((values) => {
    managerProductServ.addVariant(values);
});

const updateVariant = handleSubmit((values) => {
    console.log(values);
    console.log(productId);

    const productData = { color: values.color, stock: values.stock, size: values.size, id: values.id, productId: productId };
    managerProductServ.updateVariant(productData);
});

let addVariantAreVisible = ref(false);
let editVariantAreVisible = ref<number | null>(null);

const toggleAddVariant = () => {
    addVariantAreVisible.value = !addVariantAreVisible.value;
};

const toggleEditVariant = (index: any) => {
    if (editVariantAreVisible.value === index) {
        editVariantAreVisible.value = null;
    } else {
        editVariantAreVisible.value = index;
    }
};
</script>

<template>
    <div v-if="productServ.oneProductDetail.value" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <img v-if="productServ.oneProductDetail.value!.image" :src="productServ.oneProductDetail.value!.image" />
        <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productServ.oneProductDetail.value!.id }}</p>
        <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ productServ.oneProductDetail.value!.name }}</p>
        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ productServ.oneProductDetail.value!.description }}</p>
        <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ productServ.oneProductDetail.value!.price }}</p>
        <p class="text-gray-700"><span class="font-semibold">Category ID:</span> {{ productServ.oneProductDetail.value!.categoryId }}</p>

        <RouterLink class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none" :to="{ name: 'manager.products.edit', params: { id: productServ.oneProductDetail.value!.id } }">Edit</RouterLink>

        <button @click="managerProductServ.deleteProduct(productServ.oneProductDetail.value!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete</button>

        <button @click="toggleAddVariant" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
            {{ addVariantAreVisible ? 'Cancel' : 'Add Variant' }}
        </button>

        <div v-if="addVariantAreVisible" class="px-4 py-6">
            <div class="bg-gray-50 dark:bg-corduroy-900 rounded-lg shadow">
                <div class="p-6 space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Add variant</h1>
                    <form class="max-w-md mx-auto" @submit.prevent="createVariant">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="productId" v-slot="{ field, meta }">
                                <input type="text" id="productId" v-bind="field" v-model="productServ.oneProductDetail.value!.id" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required disabled />
                                <label for="productId" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product ID</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="productId" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>
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
                                <input type="number" id="stock" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="stock" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant stock</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="stock" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Variant</button>
                    </form>
                </div>
            </div>
        </div>

        <ul v-if="productServ.productVariants">
            <li v-for="(productVariant, index) in productServ.productVariants.value" :key="index">
                <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ productVariant!.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ productVariant!.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ productVariant!.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ productVariant!.productId }}</p>

                <button @click="toggleEditVariant(index)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    {{ editVariantAreVisible === index ? 'Cancel' : 'Edit Variant' }}
                </button>

                <button @click="managerProductServ.deleteVariant(productVariant!.id)" class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Delete Variant</button>

                <div v-if="editVariantAreVisible === index" class="px-4 py-6">
                    <div class="bg-gray-50 dark:bg-corduroy-900 rounded-lg shadow">
                        <div class="p-6 space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Edit variant</h1>
                            <form class="max-w-md mx-auto" @submit.prevent="updateVariant">
                                <div class="relative z-0 w-full mb-5 group">
                                    <Field name="id" v-slot="{ field, meta }">
                                        <input type="number" id="id" v-bind="field" v-model="productVariant!.id" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required readonly />
                                        <label for="id" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant ID</label>
                                    </Field>
                                </div>
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
                                    <Field name="color" v-slot="{ field, meta }">
                                        <input type="text" id="color" v-bind="field" v-model="productVariant!.color" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label for="color" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant color</label>
                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="color" class="text-red-500 text-xs mt-1" />
                                    </Field>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <Field name="stock" v-slot="{ field, meta }">
                                        <input type="number" id="stock" v-bind="field" v-model="productVariant!.stock" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label for="stock" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant stock</label>
                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="stock" class="text-red-500 text-xs mt-1" />
                                    </Field>
                                </div>
                                <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit Variant</button>
                            </form>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
