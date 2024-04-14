<script setup lang="ts">
import { useUserStore } from '@/stores/client/user';
import { computed } from 'vue';

const userStore = useUserStore();
userStore.userDetail();
const user = computed(() => userStore.user);
const loggedUser = userStore.userDetail().then(loggedUser => {
    user.value.id = loggedUser.id;
    user.value.name = loggedUser.name;
    user.value.surnames = loggedUser.surnames;
    user.value.birthdate = new Date(loggedUser.birthdate);
    user.value.email = loggedUser.email;
}
);

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(navigator.language, { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};
</script>

<template>
    <div class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6">
        <p class="text-lg font-semibold mb-2 text-gray-700">User Information</p>
        <div>
            <p class="text-gray-700"><span class="font-semibold">ID:</span> {{ user.id }}</p>
            <p class="text-gray-700"><span class="font-semibold">Name:</span> {{ user.name }}</p>
            <p class="text-gray-700"><span class="font-semibold">Surnames:</span> {{ user.surnames }}</p>
            <p class="text-gray-700"><span class="font-semibold">Birthdate:</span> {{ user.birthdate ?
                formatDate(user.birthdate) : 'N/A' }}</p>
            <p class="text-gray-700"><span class="font-semibold">Email:</span> {{ user.email }}</p>
            <RouterLink
                class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
                to="/user/edit">Edit</RouterLink>
        </div>
    </div>
</template>