<script setup>

import { computed, ref } from "vue";
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import data from '@/data'

const products = ref(data)
const currentProduct = ref(products.value[0])

const goToProduct = (prod) => currentProduct.value = prod;

const badgeClass = (badge) => {
  if (!badge) return '';
  switch (badge) {
    case 'SALE': return 'bg-red-500 text-white';
    case 'NEW': return 'bg-green-600 text-white';
    case 'BESTSELLER': return 'bg-yellow-400 text-black';
    default: return 'bg-gray-200 text-black';
  }
}

const discountedPrice = computed(() => {
    const price = currentProduct.value.price;
    const discount = currentProduct.value.discount;
    const final = price * (1 - discount / 100);
    return Math.round(final * 100) / 100;
});

</script>


<template>
  <NavBar :title="'ITI Store'" />

  <div class="flex justify-between  text-2xl m-5">

      <main class="p-10">
          <!-- product-details -->
      <div class="grid grid-cols-2 grid-flow-row gap-4">
          
        <img class="w-full h-80 object-cover rounded-2xl"  :src="currentProduct.image" alt="Product Image">
          
          <div class="flex flex-col gap-5">
            <p v-if="currentProduct.badge" :class="badgeClass(currentProduct.badge) + ' inline-block px-2 py-1 rounded text-sm font-semibold'">{{ currentProduct.badge }}</p>
            <h3>{{ currentProduct.name }}</h3>

            <h4 class="text-lg font-bold">Description</h4>

            <p>{{ currentProduct.description }}</p>

            <div class="flex-flow-col grid-rows-2 gap-2">
              <div v-if="currentProduct.discount !== 0">
                    <h4 class="text-lg font-bold"> original Price</h4>
                    <p class="line-through text-gray-500" >${{ currentProduct.price }}</p>
                    <h4 class="text-lg font-bold">discounted price</h4>
                    <p class="" >${{ discountedPrice }}</p>
              </div>

              <div v-else>
                    <h4> original Price</h4>
                    <p  >${{ currentProduct.price }}</p>
              </div>
            <p 
                class="text-white text-center p-2 w-28 rounded-full font-medium"
                :class="currentProduct.isAvailable ? 'bg-green-600' : 'bg-red-600'"
              >
                {{ currentProduct.isAvailable ? 'In Stock' : 'Out of Stock' }}
              </p>
            </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in currentProduct.tags" :key="tag" class="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                  {{ tag }}
                </span>
              </div>
            
            <button :class="currentProduct.isAvailable?'bg-blue-500 p-3 rounded-full':'bg-blue-400 p-3 rounded-full ' " :disabled="!currentProduct.isAvailable" @click="addToCart()">Buy Now</button>
          </div>
      </div>

      <!-- related-products -->
      <p class="mt-6 font-semibold text-xl mb-5">Related Products</p>
          <div class="flex gap-4 overflow-x-auto pb-3 snap-x">
        <button 
          @click="goToProduct(product)"
          class="w-1/3 min-w-[150px] flex-shrink-0 border p-2 rounded text-left snap-start bg-white" 
          v-for="product in products.filter(product=>{
            const currentProductTags = new Set(currentProduct.tags);
            return product.tags.some(tag => currentProductTags.has(tag)) && product.id !== currentProduct.id;
          })" 
          :key="product.id"
        >
          <img :src="product.image" class="w-full h-50 object-cover rounded" alt="">
          <p class="text-sm text-black font-semibold mt-5 truncate">{{ product.name }}</p>
          <p :class="product.isAvailable? 'text-green-900' : 'text-red-900'">{{ product.isAvailable? 'inStock':'out of stock' }}</p>

          <div class="mt-2">
            <div v-if="product.discount > 0">
              <p class="text-sm line-through text-gray-500">${{ product.price }}</p>
              <p class="text-sm font-semibold">${{ Math.round(product.price * (1 - product.discount/100) * 100)/100 }}</p>
            </div>
            <div v-else>
              <p class="text-sm font-semibold">${{ product.price }}</p>
            </div>
          </div>
        </button>

      
    </div >
  </main>

  </div>


<Footer />
</template>

<style scoped></style>
