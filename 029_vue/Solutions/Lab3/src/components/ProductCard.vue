<script setup>
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  actionLabel: {
    type: String,
    default: "View Product",
  },
});

const formattedPrice = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price),
);

const stockLabel = computed(() =>
  props.product.isAvailable ? "In stock" : "Out of stock",
);

const stockClass = computed(() =>
  props.product.isAvailable ? "in-stock" : "out-stock",
);

const productTitle = computed(() => props.product.name || props.product.title || "Untitled Product");
const productImageAlt = computed(() => props.product.name || props.product.title || "Product image");
const productDescription = computed(() => props.product.description || "");
const productBadge = computed(() => props.product.badge || "Featured");
const discountedPrice = computed(() => {
  const price = Number(props.product.price || 0);
  const discount = Number(props.product.discount || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.max(price - discount, 0));
});

</script>

<template>
  <article class="card product-card hover-lift">
    <figure class="product-card__media">
      <img :src="product.image" :alt="productImageAlt" loading="lazy" />
    </figure>

    <div class="product-card__body">
      <div class="flex items-center justify-between gap-3">
        <span class="badge badge-outline badge-sm">{{ productBadge }}</span>
        <!-- <span class="product-card__stock" :class="stockClass">{{ stockLabel }}</span> -->
      </div>

      <h3 class="product-card__title">{{ productTitle }}</h3>
      <p class="product-card__description">{{ productDescription }}</p>

      <div class="product-card__tags">
        <!-- <span v-for="tag in product.tags" :key="tag" class="product-card__tag">#{{ tag }}</span> -->
      </div>

      <div class="product-card__footer">
        <div class="product-card__price">
          <strong>{{ discountedPrice }}</strong>
          <small class="muted">{{ formattedPrice }}</small>
        </div>

        <RouterLink :to="`/products/${product.id}`" class="product-card__link">
          {{ actionLabel }}
        </RouterLink>
      </div>
    </div>
  </article>
</template>
