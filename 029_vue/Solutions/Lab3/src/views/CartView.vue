<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const { items, totalPrice } = storeToRefs(cartStore);
const { removeFromCart, clearCart } = cartStore;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatPrice = (value) => currency.format(Number(value ?? 0));

const rows = computed(() =>
  items.value.map((item) => ({
    ...item,
    label: item.name || item.title || `Product #${item.id}`,
    subtotal: Number(item.price ?? 0) * Number(item.quantity ?? 0),
  })),
);
</script>

<template>
  <div class="view-shell">
    <section class="view-panel about-card p-6">
      <div class="product-grid-header">
        <div>
          <p class="section-kicker">Cart</p>
          <h1 class="section-title">Your selected items</h1>
        </div>
        <button class="btn btn-sm btn-outline" :disabled="!items.length" @click="clearCart">
          Clear cart
        </button>
      </div>

      <div v-if="rows.length" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rows" :key="item.id">
              <td>{{ item.label }}</td>
              <td>{{ formatPrice(item.price) }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ formatPrice(item.subtotal) }}</td>
              <td>
                <button class="btn btn-sm btn-error btn-outline" @click="removeFromCart(item.id)">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="text-base-content/70 py-8">Your cart is empty</p>

      <div v-if="rows.length" class="mt-6 flex items-center justify-end gap-4 border-t border-white/10 pt-4">
        <span class="text-lg font-semibold">Total</span>
        <span class="text-2xl font-bold text-primary">{{ formatPrice(totalPrice) }}</span>
      </div>
    </section>
  </div>
</template>