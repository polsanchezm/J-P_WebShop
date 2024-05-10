<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useFormatDate } from '@/composables/formatDate';
const { formatDate } = useFormatDate();
const authServ = useAuthStore();

onBeforeMount(async () => {
    await authServ.detailUser();
    console.log('user', authServ.user);
});

</script>

<template>
    <div v-if="authServ.user" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">User Information</p>
        <div>
            <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ authServ.user!.id }}</p>
            <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ authServ.user!.name }}</p>
            <p class="text-gray-700"><span class="font-semibold">Surnames:</span> {{ authServ.user!.surnames }}
            </p>
            <p class="text-gray-700"><span class="font-semibold">Birthdate:</span> {{
                formatDate(authServ.user!.birthdate) }}</p>
            <p class="text-gray-700"><span class="font-semibold">Email:</span> {{ authServ.user!.email }}</p>
            <RouterLink
                class="gradient-button inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                :to="{ name: 'user.edit' }">Edit</RouterLink>
        </div>
    </div>
</template>
