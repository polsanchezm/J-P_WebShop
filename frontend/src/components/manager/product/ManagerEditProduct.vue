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
const isLoading = ref(true);
onBeforeMount(async () => {
    await productStore.oneProduct(productId);
    isLoading.value = false;
    console.log('product', productStore.productDetail);
});

const imageFile = ref<File | null>(null);
const imageUrl = ref<string | null>(null);

const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
        imageFile.value = files[0];
        console.log(imageFile);

        imageUrl.value = URL.createObjectURL(files[0]);
    }
};

const formSchema = yup.object({
    name: yup
        .string()
        .required('Name is required.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Name can only contain letters.'),
    description: yup
        .string()
        .required('Description is required.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’0-9]+$/, 'Description can only contain letters and numbers.'),
    price: yup
        .string()
        .required('Product price is required.')
        .matches(/^[0-9]+(\.[0-9]{1,2})?$/, 'Product price must be a valid number.')
        .typeError('Product price must be numeric.')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    const productData = { ...values, image: imageFile.value, productId: productStore.productDetail!.id };
    console.log(productData);
    productStore.updateProduct(productData);
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center">
            <div class="flex flex-col w-full min-h-screen bg-gray-50 lg:pt-1 pt-0 items-center mt-28 dark:bg-corduroy-900">
                <div class="bg-gray-400 dark:bg-gray-700 p-5 mt-0 w-full">
                    <h2 class="text-3xl font-bold text-white text-center">Edit Product</h2>
                </div>
                <div v-if="isLoading" class="flex justify-center items-center h-screen w-full" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else>
                    <div v-if="productStore.productDetail!" class="p-6 space-y-6 md:space-y-6 sm:p-8 mt-10">
                        <form class="max-w-md mx-auto" @submit.prevent="onSubmit" enctype="multipart/form-data">
                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="name" v-slot="{ field, meta }" v-model="productStore.productDetail!.name">
                                    <input type="text" id="name" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="name" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product name</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="name" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="description" v-slot="{ field, meta }" v-model="productStore.productDetail!.description">
                                    <input type="text" id="floating_description" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_description" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product description</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="description" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <img v-if="productStore.productDetail!.image && !imageUrl" :src="productStore.productDetail!.image" />
                                <img v-if="imageUrl" :src="imageUrl" />
                                <input type="file" id="image" @change="handleFileChange" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" required />
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="price" v-slot="{ field, meta }" v-model="productStore.productDetail!.price">
                                    <input type="text" id="price" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="price" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product price</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="price" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="categoryId" id="categoryId" as="select" v-model="productStore.productDetail!.categoryId" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                    <option :value="1">Top</option>
                                    <option :value="2">Bottom</option>
                                    <option :value="3">Underwear</option>
                                    <option :value="4">Footwear</option>
                                </Field>
                                <label for="categoryId" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product category</label>
                            </div>
                            <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
