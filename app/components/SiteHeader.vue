<script setup lang="ts">
import { Search, ShoppingBag, Menu, X, Sparkles, ArrowUpRight } from 'lucide-vue-next'
const { count, open, ready } = useCart()
const route = useRoute()
const mobileOpen = ref(false)
const query = ref('')
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)
const search = () =>
  navigateTo({ path: '/shop', query: query.value.trim() ? { q: query.value.trim() } : {} })
</script>
<template>
  <div class="announcement">
    <span><Sparkles :size="13" /> BIG STORIES. INFINITE POSSIBILITIES.</span
    ><NuxtLink to="/about">Explore the demo <ArrowUpRight :size="13" /></NuxtLink>
  </div>
  <header class="site-header">
    <div class="header-inner wrap">
      <NuxtLink class="wordmark" to="/" aria-label="CosmicComics home"
        ><span class="brand-star">✦</span>COSMIC<span>COMICS</span></NuxtLink
      >
      <nav class="desktop-nav" aria-label="Main navigation">
        <NuxtLink to="/shop">Shop all</NuxtLink
        ><NuxtLink to="/shop?collection=new">New releases <span class="nav-dot" /></NuxtLink
        ><NuxtLink to="/shop?collection=featured">Staff picks</NuxtLink
        ><NuxtLink to="/#publishers">Publishers</NuxtLink>
      </nav>
      <div class="header-actions">
        <NuxtLink class="icon-button" to="/shop?search=1" aria-label="Search comics"
          ><Search :size="21" /></NuxtLink
        ><button
          class="cart-trigger"
          aria-label="Open cart"
          :disabled="!ready"
          @click="open = true"
        >
          <ShoppingBag :size="20" /><span class="cart-label">Cart</span
          ><span class="cart-count">{{ count }}</span></button
        ><button
          class="icon-button mobile-toggle"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          :aria-label="mobileOpen ? 'Close navigation' : 'Open navigation'"
          :disabled="!ready"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="22" /><Menu v-else :size="22" />
        </button>
      </div>
    </div>
    <div v-if="mobileOpen" id="mobile-nav" class="mobile-nav">
      <nav aria-label="Mobile navigation">
        <NuxtLink to="/shop">Shop all comics</NuxtLink
        ><NuxtLink to="/shop?collection=new">New releases</NuxtLink
        ><NuxtLink to="/shop?collection=featured">Staff picks</NuxtLink
        ><NuxtLink to="/#publishers">Publishers</NuxtLink>
      </nav>
      <form @submit.prevent="search">
        <label class="sr-only" for="mobile-search">Search comics</label
        ><input id="mobile-search" v-model="query" placeholder="Find your next read" /><button
          class="icon-button"
          aria-label="Submit search"
        >
          <Search :size="20" />
        </button>
      </form>
    </div>
  </header>
</template>
