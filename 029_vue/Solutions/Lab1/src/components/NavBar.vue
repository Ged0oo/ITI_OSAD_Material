<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header id="site-nav">
    <div id="nav-brand">{{ props.title }}</div>

    <nav id="nav-links" aria-label="Main navigation">
      <a href="#product-showcase" class="nav-link">Featured</a>
      <a href="#related-section" class="nav-link">Related</a>
      <a href="#site-footer" class="nav-link">Contact</a>
    </nav>

    <div id="nav-actions">
      <button id="nav-cta" type="button">Sign In</button>
    </div>
  </header>
</template>
