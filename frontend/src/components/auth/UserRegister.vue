<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth/auth';
const authStore = useAuthStore();

yup.addMethod(yup.date, 'minAge', function (minAge, message) {
    return this.test('minAge', message, function (value) {
        const { path, createError } = this;

        const today = new Date();
        const birthDate = new Date(value!);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < minAge) {
            return createError({ path, message });
        }

        return true;
    });
});

// Validacions del formulari
const formSchema = yup.object({
    name: yup
        .string()
        .required('Name is required.')
        .min(1, 'Name must be at least 1 character long.')
        .max(50, 'Name must be maximum 50 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Name can only contain letters.'),
    surnames: yup
        .string()
        .required('Surnames are required.')
        .min(1, 'Surnames must be at least 1 character long.')
        .max(100, 'Surnames must be maximum 100 characters long.')
        .matches(/^[a-zA-Z àèìòùñçáéíóúÀÈÌÒÙÑÇÁÉÍÓÚ'’]+$/, 'Surnames can only contain letters.'),
    birthdate: yup.date().required('Birthdate is required.').typeError('Birthdate must be a valid date').minAge(14, 'You must be at least 14 years old.'),
    email: yup.string().required('Email is required.').email('Invalid email format.'),
    currentPassword: yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
    currentPasswordConfirmation: yup
        .string()
        .required('Password confirmation is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .oneOf([yup.ref('currentPassword')], 'Passwords must match.')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    const registerData = {
        name: values.name,
        surnames: values.surnames,
        birthdate: values.birthdate,
        email: values.email,
        currentPassword: values.currentPassword,
        currentPasswordConfirmation: values.currentPasswordConfirmation
    };
    // Truca al mètode registerUser de l'store
    authStore.registerUser(registerData);
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-lg bg-gray-50 dark:bg-corduroy-900 rounded-xl shadow md:mt-0 sm:max-w-lg xl:p-0">
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Create an account</h1>
                    <form class="max-w-md mx-auto" @submit.prevent="onSubmit">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="name" v-slot="{ field, meta }">
                                <input type="text" id="floating_name" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="name" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="surnames" v-slot="{ field, meta }">
                                <input type="text" id="floating_surnames" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_surnames" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Surnames</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="surnames" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="birthdate" v-slot="{ field, meta }">
                                <input type="date" id="floating_birth" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_birth" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birthdate</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="birthdate" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="email" v-slot="{ field, meta }">
                                <input type="text" id="floating_email" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="email" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="currentPassword" v-slot="{ field, meta }">
                                <input type="password" id="floating_password" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="currentPassword" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="currentPasswordConfirmation" v-slot="{ field, meta }">
                                <input type="password" id="floating_confirm_password" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_confirm_password" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="currentPasswordConfirmation" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center">Sign up</button>
                        <p class="text-sm font-semibold text-metal-800 dark:text-ecru-200 peer-focus:dark:text-ecru-50 mt-6">
                            Already have an account?
                            <RouterLink :to="{ name: 'login' }" class="font-medium text-gray-700 hover:text-metal-950 dark:text-ecru-400 dark:hover:text-ecru-100 hover:font-bold transition-colors">Sign in</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
