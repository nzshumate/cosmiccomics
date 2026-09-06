<script setup lang="ts">
import { ArrowUpRight, Plus, BookOpen, Palette, PenLine, ArrowLeft } from 'lucide-vue-next'
import { comics, money } from '~/data/comics'
const route = useRoute()
const comic = computed(() => comics.find((c) => c.slug === route.params.slug))
if (!comic.value) throw createError({ statusCode: 404, statusMessage: 'Comic not found' })
const related = computed(() =>
  comics.filter((c) => c.slug !== comic.value?.slug && c.genre === comic.value?.genre).slice(0, 4),
)
const { add, ready } = useCart()
useSeoMeta({
  title: () => `${comic.value?.title} — CosmicComics`,
  description: () => comic.value?.description,
  ogTitle: () => comic.value?.title,
  ogDescription: () => comic.value?.description,
  ogImage: () => comic.value?.image,
})
</script>
<template>
  <div v-if="comic" class="detail-page wrap">
    <div class="breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><span>/</span><NuxtLink to="/shop">The collection</NuxtLink
      ><span>/</span><span>{{ comic.title }}</span>
    </div>
    <div class="product-layout">
      <div class="product-art">
        <ComicCover :comic="comic" eager /><span class="art-caption"
          >OFFICIAL COVER ART · {{ comic.publisher }}</span
        >
      </div>
      <div class="product-info">
        <NuxtLink
          :to="{ path: '/shop', query: { publisher: comic.publisher } }"
          class="eyebrow publisher-tag"
          >{{ comic.publisher }} <ArrowUpRight :size="14"
        /></NuxtLink>
        <div class="product-badges">
          <span v-if="comic.isNew" class="badge">NEW RELEASE</span
          ><span v-if="comic.featured" class="badge subtle">STAFF PICK</span
          ><span>{{ comic.genre }} / {{ comic.year }}</span>
        </div>
        <h1>{{ comic.title }}</h1>
        <p class="product-creators">{{ comic.writer }} <span>&</span> {{ comic.artist }}</p>
        <p class="product-description">{{ comic.description }}</p>
        <div class="product-price">
          <strong>{{ money(comic.price) }}</strong
          ><span>USD · Demo price</span>
        </div>
        <button class="button primary wide add-product" :disabled="!ready" @click="add(comic.slug)">
          Add to cart <Plus :size="22" />
        </button>
        <p class="demo-note">
          Explore freely. This is a demo store; no purchases or shipments are made.
        </p>
        <dl class="product-specs">
          <div>
            <dt><BookOpen :size="17" /> Format</dt>
            <dd>Single issue · English</dd>
          </div>
          <div>
            <dt><PenLine :size="17" /> Writer</dt>
            <dd>{{ comic.writer }}</dd>
          </div>
          <div>
            <dt><Palette :size="17" /> Artist</dt>
            <dd>{{ comic.artist }}</dd>
          </div>
          <div>
            <dt>Publication year</dt>
            <dd>{{ comic.year }}</dd>
          </div>
        </dl>
        <a
          :href="comic.source"
          target="_blank"
          rel="noopener noreferrer"
          class="arrow-link source-link"
          >View official publisher details <ArrowUpRight :size="18"
        /></a>
      </div>
    </div>
    <section class="section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">KEEP THE STORY GOING</span>
          <h2>Your next read is waiting.</h2>
        </div>
        <NuxtLink to="/shop" class="arrow-link">Browse all <ArrowUpRight :size="18" /></NuxtLink>
      </div>
      <div class="comic-grid">
        <ComicCard v-for="item in related" :key="item.slug" :comic="item" />
      </div>
    </section>
    <NuxtLink to="/shop" class="arrow-link back-link"
      ><ArrowLeft :size="18" /> Back to the collection</NuxtLink
    >
  </div>
</template>
