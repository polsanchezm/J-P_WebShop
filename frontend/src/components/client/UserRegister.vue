<script setup lang="ts">
import type { User } from '@/models/user';
import { useAuthStore } from '@/stores/client/auth';
import { ref } from 'vue';
// import { useForm } from 'vee-validate';
// import { toTypedSchema } from '@vee-validate/yup';
// import * as yup from 'yup';
const authStore = useAuthStore();

const user = ref<User>({
    id: 0,
    name: '',
    surnames: '',
    birthdate: null,
    email: '',
    currentPassword: '',
    currentPasswordConfirmation: '',
    newPassword: '',
    newPasswordConfirmation: ''
});

// const schema = yup.object({
//     name: yup.string().required('Name is required'),
//     surnames: yup.string().required('Surname is required'),
//     birthdate: yup.date().nullable().required('Birthdate is required').transform((value, originalValue) => originalValue === '' ? null : value),
//     email: yup.string().email('Email is not valid').required('Email is required'),
//     password: yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required'),
//     passwordConfirmation: yup.string()
//         .oneOf([yup.ref('password'), undefined], 'Passwords must match')
//         .required('Password confirmation is required'),
// });

// const { handleSubmit, defineField, meta, errors } = useForm({
//     validationSchema: schema
// });

// const [name, nameAttrs] = defineField('name');
// const [surnames, surnamesAttrs] = defineField('surnames');
// const [email, emailAttrs] = defineField('email');
// const [password, passwordAttrs] = defineField('password');
// const [passwordConfirmation, passwordConfirmationAttrs] = defineField('passwordConfirmation');

// const onSubmit = handleSubmit(values => {
//     console.log('Handling submit:', values);
//     console.log("Form submitted");
//     console.log("Values:", values);
//     console.log("Is form valid?", meta.value.valid);
// });
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
                    <form @submit.prevent="authStore.userRegister(user)" class="space-y-4 md:space-y-6">
                        <!-- <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-6"> -->
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <!-- <input type="text" v-model="name" v-bind="nameAttrs" name="name" id="name" -->
                            <input type="text" v-model="user.name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="John" required />
                            <!-- <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span> -->
                        </div>
                        <div>
                            <label for="surnames" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surnames</label>
                            <!-- <input type="text" v-model="surnames" v-bind="surnamesAttrs" name="surnames" id="surnames" -->
                            <input type="text" v-model="user.surnames" name="surnames" id="surnames" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Doe" required />
                            <!-- <span v-if="errors.surnames" class="text-red-500">{{ errors.surnames }}</span> -->
                        </div>
                        <div>
                            <label for="birthdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your birthdate</label>
                            <!-- <input type="text" v-model="surnames" v-bind="surnamesAttrs" name="surnames" id="surnames" -->
                            <input type="date" v-model="user.birthdate" name="birthdate" id="birthdate" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                            <!-- <span v-if="errors.surnames" class="text-red-500">{{ errors.surnames }}</span> -->
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <!-- <input type="email" v-model="email" v-bind="emailAttrs" name="email" id="email" -->
                            <input type="email" v-model="user.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="johnDoe@mail.com" required />
                            <!-- <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span> -->
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <!-- <input type="password" v-model="password" v-bind="passwordAttrs" name="password" -->
                            <input type="password" v-model="user.currentPassword" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                            <!-- <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span> -->
                        </div>
                        <div>
                            <label for="passwordConfirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <!-- <input type="password" v-model="passwordConfirmation" v-bind="passwordConfirmationAttrs" -->
                            <input type="password" v-model="user.currentPasswordConfirmation" name="passwordConfirmation" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                            <!-- <span v-if="errors.passwordConfirmation" class="text-red-500">{{ errors.passwordConfirmation
                                }}</span> -->
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Create an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?

                            <RouterLink :to="{ name: 'login' }" class="gradient-button font-medium text-primary-600 hover:underline dark:text-primary-500"> Login here </RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
