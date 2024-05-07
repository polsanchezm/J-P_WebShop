<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { productManagementService } from '@/services/manager/product/product';

const managerProductServ = productManagementService();
const imageFile = ref<File | null>(null);
const imageUrl = ref<string | ArrayBuffer | null>(null);

// const insertedFile = (e: any) => {
//     imageFile.value = e.target.files[0];
//     imageUrl.value = URL.createObjectURL(e.target.files[0]);
// };

// const handleFileChange = (event: any) => {
//     if (event.target.files.length > 0) {
//         imageFile.value = event.target.files[0];
//         console.log(imageFile.value);
//         const reader = new FileReader();
//         reader.readAsDataURL(imageFile.value!);

//         reader.onload = (e) => {
//             imageUrl.value = e.target!.result;
//         };
//     }
// };

const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
        imageFile.value = files[0];
        imageUrl.value = URL.createObjectURL(files[0]);
    }
};
yup.addMethod(yup.mixed, 'image', function (message = 'Invalid file') {
    return this.test('image', message, function (value: any) {
        const { path, createError } = this;

        if (!value) {
            return createError({ path, message: 'An image file is required.' });
        }

        const file = value;
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024;

        if (!allowedFormats.includes(file.type)) {
            return createError({ path, message: 'The image must be in JPEG, PNG, or GIF format.' });
        }

        if (file.size > maxSize) {
            return createError({ path, message: `The image size cannot exceed ${maxSize / 1024 / 1024}MB.` });
        }

        return true;
    });
});

const formSchema = yup.object({
    name: yup
        .string()
        .required('Name is required.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Name can only contain letters.'),
    description: yup
        .string()
        .required('Description is required.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’ 0-9]+$/, 'Description can only contain letters and numbers.'),
    price: yup
        .string()
        .required('Product price is required.')
        .matches(/^[0-9]+(\.[0-9]{1,2})?$/, 'Product price must be a valid number.')
        .typeError('Product price must be numeric.'),
    category_id: yup.string().required('Country is required.').notOneOf(['', '0'], 'Please select a category.')
});

const { handleSubmit } = useForm({
    // validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    console.log(values);
    managerProductServ.addProduct({ ...values, image: imageFile.value });
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-lg bg-gray-50 dark:bg-corduroy-900 rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Create Product</h1>
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

                        <div class="relative z-0 w-full mb-5 group" id="preview">
                            <img v-if="imageUrl" :src="imageUrl" />
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
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
                            <Field name="categoryId" v-slot="{ field, meta }">
                                <select id="categoryId" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                    <option :value="1">Top</option>
                                    <option :value="2">Bottom</option>
                                    <option :value="3">Underwear</option>
                                    <option :value="4">Footwear</option>
                                </select>
                                <label for="categoryId" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product category</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="categoryId" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
