<script setup lang="ts"></script>

<template>
    <!doctype html>
    <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Mi Landing Page</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        </head>
        <body class="bg-gray-100 text-gray-900">
            <!-- Header -->

            <!-- Productos -->
            <section class="container mx-auto p-8">
                <h2 class="text-2xl font-bold text-center">Nuestros Productos</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="font-bold text-lg">Producto 1</h3>
                        <p class="text-gray-700 mt-2">Descripción del producto 1.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="font-bold text-lg">Producto 2</h3>
                        <p class="text-gray-700 mt-2">Descripción del producto 2.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="font-bold text-lg">Producto 3</h3>
                        <p class="text-gray-700 mt-2">Descripción del producto 3.</p>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="bg-gray-800 text-white text-center p-4">
                <p class="text-sm">© 2024 Mi Empresa. Todos los derechos reservados.</p>
            </footer>
        </body>
    </html>
</template>

<style scoped></style>
