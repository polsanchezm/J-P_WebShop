<script setup>
import 'vue3-carousel/dist/carousel.css';
import image1 from '@/assets/fondo.png';

import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';

const images = ref([
    { src: image1, alt: 'Descripción de la imagen 1' },
    { src: image1, alt: 'Descripción de la imagen 2' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' }
]);
</script>

<template>
    <header class="text-white custom-gradient">
        <div class="container mx-auto p-12 text-center">
            <h1 class="text-4xl font-bold">Bienvenido a Nuestra Tienda</h1>
            <p class="text-xl mt-2">Encuentra lo mejor en productos tecnológicos aquí.</p>
        </div>
    </header>

    <div>
        <Carousel :autoplay="5000" :transition="2000" :wrap-around="true">
            <Slide v-for="image in images" :key="image">
                <img :src="image.src" :alt="image.alt" class="block w-96" />
            </Slide>
        </Carousel>
    </div>
</template>

<style scoped>
.custom-gradient {
    background-image: linear-gradient(to right, #581a94, #54178e, #501588, #4c1382, #48107c, #48107c, #48107c, #48107c, #4c1382, #501588, #54178e, #581a94);
}
</style>
