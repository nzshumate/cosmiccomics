<script setup lang="ts">
import { Plus, ArrowUpRight } from 'lucide-vue-next'
import { money } from '~/data/comics'
import type { Comic } from '~/types/comic'
defineProps<{ comic: Comic; eager?: boolean }>()
const { add, ready } = useCart()
</script>
<template>
  <article class="comic-card" :data-comic="comic.slug">
    <NuxtLink :to="`/comics/${comic.slug}`" class="card-art" :aria-label="`View ${comic.title}`">
      <ComicCover :comic="comic" :eager="eager" />
      <span v-if="comic.isNew" class="badge">NEW RELEASE</span>
      <span v-else-if="comic.featured" class="badge subtle">STAFF PICK</span>
      <span class="card-discover"><ArrowUpRight :size="20" /></span>
    </NuxtLink>
    <div class="card-meta">
      <span>{{ comic.publisher }}</span
      ><span>{{ comic.year }} · Single issue</span>
    </div>
    <h3>
      <NuxtLink :to="`/comics/${comic.slug}`">{{ comic.title }}</NuxtLink>
    </h3>
    <p>
      {{ comic.writer }} <span> / {{ comic.artist }}</span>
    </p>
    <div class="card-bottom">
      <strong>{{ money(comic.price) }}</strong
      ><button
        class="quick-add"
        :aria-label="`Add ${comic.title} to cart`"
        :disabled="!ready"
        @click="add(comic.slug)"
      >
        <Plus :size="16" /><span>Add to cart</span>
      </button>
    </div>
  </article>
</template>
