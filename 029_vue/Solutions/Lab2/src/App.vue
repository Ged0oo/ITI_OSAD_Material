<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import data from "@/data";

const products = data;

</script>

<template>
  <div id="app-shell">
    <NavBar title="ITI Store" />

    <main>
      <RouterView v-slot="{ Component }">
        <component :is="Component" :products="products" />
      </RouterView>
    </main>

    <Footer />
  </div>
</template>
