<script setup>
import ProductView from "./ProductView.vue";

defineProps({
  product: {
    type: Object,
    required: true,
  },
  ctaLabel: {
    type: String,
    default: "Buy Now",
  },
});
</script>

<template>
  <section class="card bg-base-100 shadow-xl">
    <div class="card-body gap-6 lg:flex-row lg:items-center">
      <figure
        class="overflow-hidden rounded-box border border-base-300 bg-base-200 lg:min-h-[400px] lg:w-1/2"
      >
        <img
          :src="product.image"
          :alt="product.imageAlt"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </figure>

      <div class="lg:w-1/2">
        <ProductView :product="product" :cta-label="ctaLabel" />
      </div>
    </div>
  </section>
</template>
