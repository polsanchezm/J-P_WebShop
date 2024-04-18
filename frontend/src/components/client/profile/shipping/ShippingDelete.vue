<script setup lang="ts">
import { useShippingStore } from '@/stores/client/shipping';
import { useRoute } from 'vue-router';
const route = useRoute();
const shippingStore = useShippingStore();
const paramId = route.params.id;
const shippingId = Array.isArray(paramId) ? parseInt(paramId[0]) : parseInt(paramId);
shippingStore.shippingDelete(shippingId);
</script>

<template>
    <div></div>
</template>
