<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useProductStore } from '@/stores/product/product';

const productStore = useProductStore();
const imageFile = ref<File | null>(null);
const imageUrl = ref<string | null>(null);

// Gestiona el canvi d'imatge
const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
        imageFile.value = files[0];
        imageUrl.value = URL.createObjectURL(files[0]);
    }
};

// Validacions
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
    // Truca el mètode addProduct de l'store de producte
    productStore.addProduct({ ...values, image: imageFile.value });
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center">
            <div class="flex flex-col w-full min-h-screen bg-gray-50 pt-7 items-center mt-20 dark:bg-corduroy-900">
                <div class="bg-gray-400 dark:bg-gray-700 pb-6 pt-6 w-full">
                    <h2 class="text-3xl font-bold text-white text-center">Create Product</h2>
                </div>
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8 mt-20">
                    <form class="max-w-md mx-auto" @submit.prevent="onSubmit" enctype="multipart/form-data">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="name" v-slot="{ field, meta }">
                                <input type="text" id="name" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="name" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product name</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="name" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="description" v-slot="{ field, meta }">
                                <input type="text" id="floating_description" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_description" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product description</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="description" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <img v-if="imageUrl" :src="imageUrl" />
                            <input type="file" id="image" @change="handleFileChange" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" required />
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="price" v-slot="{ field, meta }">
                                <input type="text" id="price" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="price" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product price</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="price" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="categoryId" id="categoryId" as="select" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                <option :value="1">Top</option>
                                <option :value="2">Bottom</option>
                                <option :value="3">Underwear</option>
                                <option :value="4">Footwear</option>
                            </Field>
                            <label for="categoryId" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product category</label>
                        </div>
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
