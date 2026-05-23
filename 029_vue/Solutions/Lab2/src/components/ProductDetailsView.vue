
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { computed } from "vue";
import RelatedProducts from "@/components/RelatedProducts.vue";
import data from "@/data";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const products = ref(data);

const featuredProduct = ref(null);
const relatedProducts = ref([]);

const buyNowLabel = "Buy Noooooooow";
const relatedTitle = "Related Products";
const relatedActionLabel = "View Product";

const formattedOriginalPrice = computed(() => {
  if (!featuredProduct.value) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(featuredProduct.value.price);
});

const formattedDiscountedPrice = computed(() => {
  if (!featuredProduct.value) return "";
  const price = featuredProduct.value.price || 0;
  const discount = featuredProduct.value.discount || 0;
  const discounted = price - discount;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(discounted);
});

const badgeClass = computed(() => {
  const b = (featuredProduct.value && featuredProduct.value.badge) || "";
  if (!b) return "badge-default";
  if (b.toLowerCase().includes("sale")) return "badge-sale";
  if (b.toLowerCase().includes("new")) return "badge-new";
  if (b.toLowerCase().includes("bestseller")) return "badge-bestseller";
  return "badge-default";
});

const availabilityClass = computed(() => {
  if (!featuredProduct.value) return "status-out-stock";
  return featuredProduct.value.isAvailable ? "status-in-stock" : "status-out-stock";
});

const tags = computed(() => (featuredProduct.value ? featuredProduct.value.tags || [] : []));

const flash = ref("");
function handleBuy() {
  if (!featuredProduct.value || !featuredProduct.value.isAvailable) return;
  flash.value = `${featuredProduct.value.name} added to cart`;
  setTimeout(() => (flash.value = ""), 2200);
}

onMounted(() => {
  getPageData();
  console.log("Product details page mounted");
});

onUnmounted(() => {
  console.log("Product Details page unmounted");
});

const getPageData = () => {
  console.log("Getting page data for id=", props.id);
  featuredProduct.value = products.value.find((p) => p.id === props.id) || null;
  relatedProducts.value = products.value.filter((p) => p.id !== props.id);
};

watch(() => props.id, getPageData, { immediate: true });

</script>

<template>
  <div id="page-content">
    <section id="product-showcase">
      <div id="product-media-panel">
        <img id="product-image" :src="featuredProduct.image" :alt="featuredProduct.name" />
      </div>

      <div id="product-info-panel">
        <div id="product-badge" :class="badgeClass">{{ featuredProduct.badge || '' }}</div>

        <h1 id="product-name">{{ featuredProduct.name }}</h1>

        <p id="product-description">{{ featuredProduct.description }}</p>

        <div id="pricing-panel">
          <div id="original-price-label">Original</div>
          <p id="original-price">{{ formattedOriginalPrice }}</p>

          <div id="discounted-price-label">Now</div>
          <p id="discounted-price">{{ formattedDiscountedPrice }}</p>

          <div id="availability-pill" :class="availabilityClass">{{ featuredProduct.isAvailable ? 'In Stock' : 'Out of Stock' }}</div>

          <div id="tag-list">
            <span v-for="t in tags" :key="t" class="tag-chip">{{ t }}</span>
          </div>

          <div style="margin-top:12px">
            <button :id="'buy-button'" :class="featuredProduct.isAvailable ? 'buy-active' : 'buy-disabled'" @click="handleBuy" :disabled="!featuredProduct.isAvailable">{{ buyNowLabel }}</button>
            <div id="flash-message" v-if="flash">{{ flash }}</div>
          </div>

        </div>
      </div>
    </section>

    <RelatedProducts :title="relatedTitle" :products="relatedProducts" :action-label="relatedActionLabel"/>
  </div>
</template>
