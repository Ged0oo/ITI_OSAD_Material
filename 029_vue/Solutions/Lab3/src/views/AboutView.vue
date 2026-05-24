<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("AboutView mounted");
});

onUnmounted(() => {
  console.log("AboutView unmounted");
});
</script>

<template>
  <div class="view-shell">
    <section class="view-panel about-card">
      <div>
        <p class="section-kicker">About</p>
        <h1 class="section-title">ITI Store</h1>
      </div>

      <div class="about-grid">
        <div>
          <p class="about-copy" style="margin-top: 16px;">
            This demo store presents a small curated product catalog with a single,
            consistent dark-mode interface. It is designed to show reusable Vue views,
            routed pages, and shared UI styling across the home, product, and about
            screens.
          </p>
        </div>

        <div class="grid gap-3">
          <div class="about-stat">
            <h3>Reusable UI</h3>
            <p>Shared theme, cards, and navigation across the demo.</p>
          </div>
          <div class="about-stat">
            <h3>Dark mode</h3>
            <p>High-contrast layout with a modern storefront feel.</p>
          </div>
          <div class="about-stat">
            <h3>ITI project</h3>
            <p>Built as a Vue learning exercise for ITI coursework.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
