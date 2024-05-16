<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth';
import { useShippingStore } from '@/stores/shipping/shipping';
const authStore = useAuthStore();
const shippingStore = useShippingStore();
const route = useRoute();
const paramId = route.params.id;
const shippingId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);
const isLoading = ref(true);

onBeforeMount(async () => {
    await authStore.detailUser();
    console.log('user', authStore.user);
    await shippingStore.detailShipping(shippingId);
    await shippingStore.userShippings();
    isLoading.value = false;

    console.log('shipping', shippingStore.oneShipping);
});

const formSchema = yup.object({
    phone: yup
        .string()
        .required('Phone number is required.')
        .matches(/^[0-9]{9}$/, 'Phone number must be exactly 9 digits.')
        .typeError('Phone number must be numeric.'),
    street: yup
        .string()
        .required('Street address is required.')
        .min(1, 'Street address must be at least 1 character long.')
        .max(100, 'Street address must be no more than 100 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Street address can only contain letters.'),
    unit: yup
        .string()
        .required('Unit is required.')
        .min(1, 'Unit must be at least 1 character long.')
        .max(50, 'Unit must be no more than 50 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Unit address can only contain letters.'),
    apartmentNumber: yup
        .string()
        .required('Apartment number is required.')
        .matches(/^[0-9]{1,3}$/, 'Apartment number must be between 1 and 999.')
        .typeError('Apartment number must be numeric.'),
    country: yup
        .string()
        .required('Country is required.')
        .min(1, 'Country must be at least 1 character long.')
        .max(100, 'Country must be no more than 100 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Country can only contain letters.'),
    city: yup
        .string()
        .required('City is required.')
        .min(1, 'City must be at least 1 character long.')
        .max(100, 'City must be no more than 100 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'City can only contain letters.'),
    otherInstructions: yup
        .string()
        .max(300, 'Other instructions must be no more than 300 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’, 0-9]+$/, 'Other instructions can only contain letters and numbers.')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    const editData = {
        id: shippingId,
        userId: authStore.user!.id,
        apartmentNumber: values.apartmentNumber,
        city: values.city,
        country: values.country,
        street: values.street,
        phone: values.phone,
        unit: values.unit,
        otherInstructions: values.otherInstructions
    };
    console.log(editData);

    shippingStore.editShipping(editData);
});
</script>
const isLoading = ref(true); isLoading.value = false;

<template>
    <section>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="flex flex-col w-full h-dvh bg-gray-50 items-center pt-14 mt-14 dark:bg-corduroy-900">
                <div class="bg-gray-400 dark:bg-gray-700 p-6 -mt-1 w-full">
                    <h2 class="text-3xl font-bold text-white text-center">Edit Shipping Line</h2>
                </div>
                <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else-if="shippingStore.oneShipping && shippingStore.oneShipping!.userId == authStore.user!.id">
                    <div class="mt-20 p-6 space-y-6 md:space-y-6 sm:p-8">
                        <form class="min-w-[300px] md:min-w-[500px] mx-auto" @submit.prevent="onSubmit">
                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="phone" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.phone">
                                    <input type="text" id="floating_phone" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="phone" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="street" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.street">
                                    <input type="text" id="floating_street" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_street" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street address</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="street" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="unit" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.unit">
                                    <input type="text" id="floating_unit" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_unit" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Unit address</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="unit" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="apartmentNumber" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.apartmentNumber">
                                    <input type="number" id="apartmentNumber" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="apartmentNumber" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apartment umber</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="apartmentNumber" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="country" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.country">
                                    <input type="text" id="country" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="country" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="country" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="city" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.city">
                                    <input type="text" id="city" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="city" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="city" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="otherInstructions" v-slot="{ field, meta }" v-model="shippingStore.oneShipping!.otherInstructions">
                                    <textarea type="text" id="otherInstructions" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="otherInstructions" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Other instruction</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="otherInstructions" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>
                            <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
