<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth/auth';
const authServ = useAuthStore();

const formSchema = yup.object({
    email: yup.string().required('Email is required').email('Incorrect email'),
    currentPassword: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters.')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    const loginData = {
        email: values.email,
        currentPassword: values.currentPassword
    };
    authServ.loginUser(loginData);
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-lg bg-gray-50 dark:bg-corduroy-900 rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Sign in to Manager account</h1>
                    <form class="max-w-md mx-auto" @submit.prevent="onSubmit">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="email" v-slot="{ field, meta }">
                                <input type="email" id="floating_email" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
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
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
