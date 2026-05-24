<script setup>
import { onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  console.log("NavBar mounted");
});

onUnmounted(() => {
  console.log("NavBar unmounted");
});
</script>

<template>
  <header id="site-nav">
    <RouterLink id="nav-brand" to="/">{{ props.title }}</RouterLink>

    <nav id="nav-links" aria-label="Main navigation">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink class="nav-link" to="/cart">Cart</RouterLink>
      <RouterLink class="nav-link" to="/about">About</RouterLink>
    </nav>

    <div id="nav-actions">
      <RouterLink id="nav-cta" to="/cart">Cart ({{ totalItems }})</RouterLink>
    </div>
  </header>
</template>
