<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
  title: {
    type: String,
    default: "Related Products",
  },
  products: {
    type: Array,
    default: () => [],
  },
  actionLabel: {
    type: String,
    default: "View Product",
  },
});
</script>

<template>
  <section class="related-products card p-4">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" :action-label="actionLabel" @action="$emit('view', product)" />
    </div>
  </section>
</template>