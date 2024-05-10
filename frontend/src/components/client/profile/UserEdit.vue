<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
const authServ = useAuthStore();

onBeforeMount(async () => {
    await authServ.detailUser();
    if (typeof authServ.user!.birthdate === 'string') {
        authServ.user!.birthdate = new Date(authServ.user!.birthdate);
        authServ.user!.birthdate = authServ.user!.birthdate.toISOString().slice(0, 10);
    }
});

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
    email: yup.string().required('Email is required.').email('Invalid email format.'),
    currentPassword: yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
    newPassword: yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
    newPasswordConfirmation: yup
        .string()
        .required('Password confirmation is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .oneOf([yup.ref('newPassword')], 'Passwords must match.')
});

const { handleSubmit } = useForm({
    validationSchema: formSchema
});

const onSubmit = handleSubmit((values) => {
    const editData = {
        name: values.name,
        surnames: values.surnames,
        email: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        newPasswordConfirmation: values.newPasswordConfirmation
    };
    authServ.editUser(editData);
});
</script>

<template>
    <section v-if="authServ.user">
        <div class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-lg bg-gray-50 dark:bg-corduroy-900 rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
                <div class="p-6 space-y-6 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-corduroy-900 dark:text-ecru-50 md:text-2xl">Edit your account</h1>
                    <form class="max-w-md mx-auto" @submit.prevent="onSubmit">
                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="name" v-slot="{ field, meta }" v-model="authServ.user.name">
                                <input type="text" id="floating_name" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="name" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="surnames" v-slot="{ field, meta }" v-model="authServ.user.surnames">
                                <input type="text" id="floating_surnames" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_surnames" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Surnames</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="surnames" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="email" v-slot="{ field, meta }" v-model="authServ.user.email">
                                <input type="text" id="floating_email" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="email" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="relative z-0 w-full mb-5 group">
                            <Field name="currentPassword" v-slot="{ field, meta }">
                                <input type="password" id="floating_current_password" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                <label for="floating_current_password" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Current Password </label>
                                <ErrorMessage v-if="meta.touched && meta.dirty" name="currentPassword" class="text-red-500 text-xs mt-1" />
                            </Field>
                        </div>

                        <div class="flex flex-wrap -mx-3">
                            <div class="relative z-0 mb-5 group w-1/2 px-3 mt-6">
                                <Field name="newPassword" v-slot="{ field, meta }">
                                    <input type="password" id="floating_new_password" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_new_password" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="newPassword" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 mb-5 group w-1/2 px-3 mt-6">
                                <Field name="newPasswordConfirmation" v-slot="{ field, meta }">
                                    <input type="password" id="floating_confirm_new_password" v-bind="field" class="block py-2.5 px-0 w-full text-sm text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_confirm_new_password" class="peer-focus:font-medium absolute text-sm text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New Password</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="newPasswordConfirmation" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>
                        </div>
                        <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit details</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
