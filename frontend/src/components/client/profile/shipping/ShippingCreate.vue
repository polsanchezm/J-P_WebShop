<script setup lang="ts">
import { ref } from 'vue';
import type { Shipping } from '@/models/shipping';
import { shippingService } from '@/services/client/shipping/shipping';
const shippingServ = shippingService();

const shipping = ref<Shipping>({
    id: 0,
    userId: 0,
    phone: '',
    street: '',
    unit: '',
    apartmentNumber: '',
    country: '',
    city: '',
    otherInstructions: ''
});
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-24">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create details</h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="shippingServ.shippingCreate(shipping)">
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone number</label>
                            <input type="text" name="phone" id="phone" v-model="shipping.phone" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="street" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your street</label>
                            <input type="text" name="street" id="street" v-model="shipping.street" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your unit</label>
                            <input type="text" name="unit" id="unit" v-model="shipping.unit" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>
                        <div class="flex flex-wrap -mx-3">
                            <div class="w-full px-3">
                                <label for="apartment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apartment number</label>
                                <input type="number" name="apartment" id="apartment" v-model="shipping.apartmentNumber" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                            </div>
                            <div class="w-1/2 px-3 mt-6">
                                <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                <input type="text" name="country" id="country" v-model="shipping.country" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                            </div>
                            <div class="w-1/2 px-3 mt-6">
                                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input type="text" name="city" id="city" v-model="shipping.city" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div>
                            <label for="other_instructions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Instructions</label>
                            <textarea type="text" name="other_instructions" id="other_instructions" v-model="shipping.otherInstructions" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
                        </div>

                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Create details</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
