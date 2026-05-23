<script setup>
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  ctaLabel: {
    type: String,
    default: "Buy Now",
  },
});

const formattedPrice = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price),
);

const stockLabel = computed(() =>
  props.product.stock > 0 ? `${props.product.stock} in stock` : "Out of stock",
);
const stockClass = computed(() =>
  props.product.stock > 0 ? "badge-success" : "badge-error",
);
</script>

<template>
  <article class="space-y-5">
    <h1 class="text-3xl font-bold md:text-4xl">{{ product.title }}</h1>

    <p class="text-base-content/80">
      {{ product.description }}
    </p>

    <div class="flex flex-wrap gap-2">
      <span v-for="tag in product.tags" :key="tag" class="badge badge-outline">
        #{{ tag }}
      </span>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <p class="text-2xl font-semibold">{{ formattedPrice }}</p>
      <span class="badge" :class="stockClass">{{ stockLabel }}</span>
    </div>

    <button class="btn btn-primary btn-wide" :disabled="product.stock === 0">
      {{ ctaLabel }}
    </button>
  </article>
</template>
