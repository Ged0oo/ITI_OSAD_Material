<script setup>
import data from "@/data";
import { computed, ref } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const currentProduct = ref(props.products[0]);
const msg = ref("");

const goToProduct = (product) => {
  currentProduct.value = product;
};

const badgeToneClass = (badge) => {
  if (!badge) return "";
  switch (badge) {
    case "SALE":
      return "badge-sale";
    case "NEW":
      return "badge-new";
    case "BESTSELLER":
      return "badge-bestseller";
    default:
      return "badge-default";
  }
};

const discountedPrice = computed(() => {
  const price = currentProduct.value.price;
  const discount = currentProduct.value.discount;
  const final = price * (1 - discount / 100);
  return Math.round(final * 100) / 100;
});

const relatedProducts = computed(() => {
  const activeTags = new Set(currentProduct.value.tags);
  return props.products.filter(
    (product) =>
      product.id !== currentProduct.value.id &&
      product.tags.some((tag) => activeTags.has(tag))
  );
});

const getDiscountedPrice = (product) => {
  const final = product.price * (1 - product.discount / 100);
  return Math.round(final * 100) / 100;
};

const addToCart = () => {
  msg.value = `${currentProduct.value.name} added to cart.`;
  setTimeout(() => {
    msg.value = "";
  }, 2000);
};
</script>




<template>

    <main id="page-content">
      <section id="product-showcase">
        <div id="product-media-panel">
          <img
            id="product-image"
            :src="currentProduct.image"
            :alt="currentProduct.name"
          />
        </div>

        <div id="product-info-panel">
          <p
            v-if="currentProduct.badge"
            id="product-badge"
            :class="badgeToneClass(currentProduct.badge)"
          >
            {{ currentProduct.badge }}
          </p>

          <h1 id="product-name">{{ currentProduct.name }}</h1>

          <h2 id="description-title">Description</h2>
          <p id="product-description">{{ currentProduct.description }}</p>

          <div id="pricing-panel">
            <template v-if="currentProduct.discount > 0">
              <p id="original-price-label">Original Price</p>
              <p id="original-price">${{ currentProduct.price }}</p>
              <p id="discounted-price-label">Discounted Price</p>
              <p id="discounted-price">${{ discountedPrice }}</p>
            </template>

            <template v-else>
              <p id="original-price-label">Price</p>
              <p id="discounted-price">${{ currentProduct.price }}</p>
            </template>

            <p
              id="availability-pill"
              :class="currentProduct.isAvailable ? 'status-in-stock' : 'status-out-stock'"
            >
              {{ currentProduct.isAvailable ? "In Stock" : "Out of Stock" }}
            </p>
          </div>

          <div id="tag-list">
            <span v-for="tag in currentProduct.tags" :key="tag" class="tag-chip">
              {{ tag }}
            </span>
          </div>

          <button
            id="buy-button"
            :class="currentProduct.isAvailable ? 'buy-active' : 'buy-disabled'"
            :disabled="!currentProduct.isAvailable"
            @click="addToCart"
          >
            Buy Now
          </button>

          <p v-if="msg" id="flash-message">{{ msg }}</p>
        </div>
      </section>

      <section id="related-section">
        <h3 id="related-title">Related Products</h3>

        <div id="related-scroll">
          <button
            v-for="product in relatedProducts"
            :key="product.id"
            class="related-card"
            @click="goToProduct(product)"
          >
            <img :src="product.image" :alt="product.name" class="related-image" />
            <p class="related-name">{{ product.name }}</p>
            <p
              class="related-stock"
              :class="product.isAvailable ? 'related-in-stock' : 'related-out-stock'"
            >
              {{ product.isAvailable ? "In Stock" : "Out of Stock" }}
            </p>

            <div class="related-pricing">
              <template v-if="product.discount > 0">
                <p class="related-original-price">${{ product.price }}</p>
                <p class="related-final-price">${{ getDiscountedPrice(product) }}</p>
              </template>
              <template v-else>
                <p class="related-final-price">${{ product.price }}</p>
              </template>
            </div>
          </button>
        </div>
      </section>
    </main>

</template>
