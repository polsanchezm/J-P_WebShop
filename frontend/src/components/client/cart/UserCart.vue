<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useCartStore } from '@/stores/cart/cart';

const cartStore = useCartStore();

onBeforeMount(() => {
    cartStore.getCartFromLocalStorage();
    console.log('cart', cartStore.cart);
});

const cartItems = computed(() => {
    const items = cartStore.cart.map((item) => ({
        price: item.product.price,
        name: item.product.name,
        variant_id: item.productVariant.id,
        quantity: item.quantity
    }));
    return items;
});

const totalPrice = computed(() => {
    return cartStore.cart
        .reduce((total, item: any) => {
            const price = parseFloat(item.product.price);
            const quantity = parseInt(item.quantity);
            if (!isNaN(price) && !isNaN(quantity)) {
                return total + price * quantity;
            } else {
                return total;
            }
        }, 0)
        .toFixed(2);
});
</script>

<template>
    <div v-if="cartStore.cart" class="max-w-md mx-auto bg-white shadow-md rounded px-4 py-6 mt-24">
        <p class="text-lg font-semibold mb-2 text-gray-700">Items</p>
        <button v-if="cartStore.cart.length > 0" @click="cartStore.removeAllFromCart()"
            class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Remove
            All</button>
        <ul>
            <li v-for="(item, index) in cartStore.cart" :key="index">
                <p class="text-gray-700"><span class="font-semibold">Product ID:</span> {{ item!.product.id }}</p>
                <p class="text-gray-700"><span class="font-semibold">Variant ID:</span> {{ item!.variantId }}</p>
                <p class="text-gray-700"><span class="font-semibold">Price:</span> {{ item!.product.price }}</p>
                <p class="text-gray-700"><span class="font-semibold">Image:</span> {{ item!.product.image }}</p>
                <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ item!.productVariant.color }}</p>
                <p class="text-gray-700"><span class="font-semibold">Size:</span> {{ item!.productVariant.size }}</p>
                <p class="text-gray-700"><span class="font-semibold">Stock:</span> {{ item!.productVariant.stock }}</p>
                <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ item!.quantity }}</p>

                <button @click="cartStore.decrementQuantity(index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">-</button>
                <button @click="cartStore.incrementQuantity(index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">+</button>
                <button @click="cartStore.removeFromCart(index)"
                    class="inline-block mt-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 focus:outline-none">Remove</button>

            </li>
            <p class="text-gray-700"><span class="font-semibold">Total price:</span> {{ totalPrice }}</p>
            <button v-if="cartStore.cart.length > 0" @click="cartStore.initiatePayment(cartItems)"
                class="inline-block mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">Pay
                with Stripe</button>
        </ul>
        <p v-if="cartStore.cart.length === 0">No items</p>
    </div>
</template>

<style scoped></style>
