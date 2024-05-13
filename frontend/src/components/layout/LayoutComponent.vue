<script setup lang="ts">
import NavbarComponent from '@/components/layout/NavbarComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import ProductsView from '@/views/client/product/ProductsView.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const router = useRoute();
const isHome = computed(() => router.name === 'home');
const userProfile = computed(() => {
    const regex = /^\/user\/?.*/;
    return regex.test(router.path);
});;
console.log('is home layout', isHome.value);
console.log(userProfile.value);
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <header>
            <NavbarComponent v-if="!isHome" />
        </header>
        <aside v-if="userProfile">
            <SidebarComponent />
        </aside>
        <main class="flex-1">
            <HeaderComponent v-if="isHome" />
            <ProductsView v-if="isHome" />
            <div v-if="userProfile">
                <RouterView class="md:ml-64 sm:ml-64"/>
            </div>
            <div v-else>
                <RouterView />
            </div>
        </main>
        <footer>
            <FooterComponent />
        </footer>
    </div>
</template>
