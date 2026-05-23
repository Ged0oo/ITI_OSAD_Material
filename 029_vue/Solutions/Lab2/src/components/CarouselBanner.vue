<script setup>
import { onMounted, onUnmounted } from "vue";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop&q=80",
    title: "New season, new essentials",
    text: "Curated gear with a clean dark aesthetic and everyday utility.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
    title: "Performance without the noise",
    text: "Shop standout products that feel premium, practical, and sharp.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=80",
    title: "Built for the modern demo",
    text: "A single visual system across the home, product, and about views.",
  },
];

onMounted(() => {
  console.log("CarouselBanner mounted");
});

onUnmounted(() => {
  console.log("CarouselBanner unmounted");
});
</script>

<template>
  <section class="view-panel banner-carousel">
    <div class="carousel carousel-center w-full space-x-4 rounded-box">
      <div
        v-for="(slide, index) in slides"
        :key="slide.title"
        :id="`slide-${index + 1}`"
        class="carousel-item banner-slide w-full"
      >
        <img :src="slide.image" :alt="slide.title" />
        <div class="banner-overlay">
          <p class="section-kicker">Featured drop</p>
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.text }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 justify-center mt-3">
      <a v-for="(slide, index) in slides" :key="slide.title" :href="`#slide-${index + 1}`" class="btn btn-sm btn-outline">{{ index + 1 }}</a>
    </div>
  </section>
</template>
