<script setup>
import { onMounted, onUnmounted } from "vue";
import CarouselBanner from "@/components/CarouselBanner.vue";
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  console.log(`HomeView mounted — ${props.products.length} products loaded`);
});

onUnmounted(() => {
  console.log("HomeView unmounted");
});
</script>

<template>
  <div class="view-shell">
    <CarouselBanner />

    <section class="view-panel about-card">
      <div class="product-grid-header">
        <div>
          <p class="section-kicker">Catalog</p>
          <h1 class="section-title">Products that match the dark demo system</h1>
        </div>
        <p class="product-grid-meta">{{ products.length }} items available</p>
      </div>

      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" action-label="View Product" />
      </div>
    </section>
  </div>
</template>
