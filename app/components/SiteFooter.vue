<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
</script>
<template>
  <footer class="site-footer">
    <div class="wrap footer-main">
      <div>
        <NuxtLink class="wordmark" to="/"
          ><span class="brand-star">✦</span>COSMIC<span>COMICS</span></NuxtLink
        >
        <p>For the stories you can’t put down.<br />And the ones you haven’t found yet.</p>
      </div>
      <div>
        <h3>The long box</h3>
        <NuxtLink to="/shop">All comics</NuxtLink
        ><NuxtLink to="/shop?collection=new">New releases</NuxtLink
        ><NuxtLink to="/shop?collection=featured">Staff picks</NuxtLink>
      </div>
      <div>
        <h3>Explore</h3>
        <NuxtLink to="/shop?publisher=DC">DC</NuxtLink
        ><NuxtLink to="/shop?publisher=Image+Comics">Image Comics</NuxtLink
        ><NuxtLink to="/about">About this demo <ArrowUpRight :size="14" /></NuxtLink>
      </div>
      <div class="footer-note">
        <span class="eyebrow">A LITTLE ESCAPISM GOES A LONG WAY</span>
        <p>Find your next universe.</p>
        <NuxtLink to="/shop" class="round-link" aria-label="Browse the comic collection"
          ><ArrowUpRight :size="30"
        /></NuxtLink>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>© {{ new Date().getFullYear() }} CosmicComics · Independent storefront demo</span
      ><span
        >Cover art belongs to its respective creators and publishers.
        <NuxtLink to="/about#credits">Sources & credits ↗</NuxtLink></span
      >
    </div>
  </footer>
</template>
