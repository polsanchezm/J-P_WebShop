<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
const authStore = useAuthStore();
const isLoading = ref(true);

// Carrega els detalls de l'usuari per a poder editar-les
onBeforeMount(async () => {
    await authStore.detailUser();
    isLoading.value = false;
    if (typeof authStore.user!.birthdate === 'string') {
        authStore.user!.birthdate = new Date(authStore.user!.birthdate);
        authStore.user!.birthdate = authStore.user!.birthdate.toISOString().slice(0, 10);
    }
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
    // Crida el mètode editUser de l'store
    authStore.editUser(editData);
});
</script>

<template>

    <section>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="flex flex-col w-full h-dvh bg-gray-50 pt-[27px] items-center mt-20 dark:bg-corduroy-900">
                <div class="bg-gray-400 dark:bg-gray-700 p-5 -mt-1 w-full pt-8">
                    <h2 class="text-3xl font-bold text-white text-center">Edit Your Profile</h2>
                </div>
                <div v-if="isLoading" class="flex justify-center items-center h-full w-full" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else-if="authStore.user">
                    <div class="mt-20 p-6 space-y-6 md:space-y-6 sm:p-8">
                        <form class="max-w-md mx-auto" @submit.prevent="onSubmit">
                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="name" v-slot="{ field, meta }" v-model="authStore.user.name">
                                    <input type="text" id="floating_name" v-bind="field" class="block py-2.5 px-0 w-full text-base text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_name" class="peer-focus:font-medium absolute text-base text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="name" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="surnames" v-slot="{ field, meta }" v-model="authStore.user.surnames">
                                    <input type="text" id="floating_surnames" v-bind="field" class="block py-2.5 px-0 w-full text-base text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_surnames" class="peer-focus:font-medium absolute text-base text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Surnames</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="surnames" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="email" v-slot="{ field, meta }" v-model="authStore.user.email">
                                    <input type="text" id="floating_email" v-bind="field" class="block py-2.5 px-0 w-full text-base text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_email" class="peer-focus:font-medium absolute text-base text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="email" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <Field name="currentPassword" v-slot="{ field, meta }">
                                    <input type="password" id="floating_current_password" v-bind="field" class="block py-2.5 px-0 w-full text-base text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label for="floating_current_password" class="peer-focus:font-medium absolute text-base text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Current Password </label>
                                    <ErrorMessage v-if="meta.touched && meta.dirty" name="currentPassword" class="text-red-500 text-xs mt-1" />
                                </Field>
                            </div>

                            <div class="flex flex-wrap -mx-3">
                                <div class="relative z-0 mb-5 group w-1/2 px-3 mt-6">
                                    <Field name="newPassword" v-slot="{ field, meta }">
                                        <input type="password" id="floating_new_password" v-bind="field" class="block py-2.5 px-0 w-full text-base text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label for="floating_new_password" class="peer-focus:font-medium absolute text-base text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="newPassword" class="text-red-500 text-xs mt-1" />
                                    </Field>
                                </div>

                                <div class="relative z-0 mb-5 group w-1/2 px-3 mt-6">
                                    <Field name="newPasswordConfirmation" v-slot="{ field, meta }">
                                        <input type="password" id="floating_confirm_new_password" v-bind="field" class="block py-2.5 px-0 w-full text-base text-metal-600 border-metal-600 focus:border-metal-950 dark:text-ecru-50 dark:border-ecru-300 dark:focus:border-ecru-50 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label for="floating_confirm_new_password" class="peer-focus:font-medium absolute text-base text-metal-600 peer-focus:text-metal-600 dark:text-ecru-200 peer-focus:dark:text-ecru-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New Password</label>
                                        <ErrorMessage v-if="meta.touched && meta.dirty" name="newPasswordConfirmation" class="text-red-500 text-xs mt-1" />
                                    </Field>
                                </div>
                            </div>
                            <button type="submit" class="w-full text-gray-50 bg-gray-700 hover:bg-gray-900 dark:text-ecru-50 dark:bg-ecru-950 dark:hover:bg-ecru-700 focus:outline-none font-medium rounded-xl text-base px-5 py-2.5 text-center">Edit details</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
