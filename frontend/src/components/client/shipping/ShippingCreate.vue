<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useShippingStore } from '@/stores/shipping/shipping';
const shippingServ = useShippingStore();

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
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’ 0-9]+$/, 'Other instructions can only contain letters and numbers.')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    const shippingData = {
        id: 0,
        userId: 0,
        phone: values.phone,
        street: values.street,
        unit: values.unit,
        apartmentNumber: values.apartmentNumber,
        country: values.country,
        city: values.city,
        otherInstructions: values.otherInstructions
    };

    shippingServ.createShipping(shippingData);
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-lg bg-gray-50 dark:bg-corduroy-900 rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Create Shipping Address</h1>
                    <form class="max-w-md mx-auto" @submit.prevent="onSubmit">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="phone" v-slot="{ field, meta }">
                                <input type="text" id="floating_phone" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="phone" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="street" v-slot="{ field, meta }">
                                <input type="text" id="floating_street" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_street" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street address</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="street" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="unit" v-slot="{ field, meta }">
                                <input type="text" id="floating_unit" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_unit" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Unit address</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="unit" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="apartmentNumber" v-slot="{ field, meta }">
                                <input type="number" id="apartmentNumber" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="apartmentNumber" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apartment umber</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="apartmentNumber" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="country" v-slot="{ field, meta }">
                                <input type="text" id="country" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="country" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="country" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="city" v-slot="{ field, meta }">
                                <input type="text" id="city" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="city" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="city" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="otherInstructions" v-slot="{ field, meta }">
                                <textarea type="text" id="otherInstructions" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="otherInstructions" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Other instruction</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="otherInstructions" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
