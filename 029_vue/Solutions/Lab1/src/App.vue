<script setup>

import { computed, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import data from "@/data";
import ProductView from "@/components/ProductView.vue";

</script>

<template>
  <div id="app-shell">
    <NavBar :title="'ITI Store'" />

    <ProductView :products="data" />

    <Footer />
  </div>
</template>
