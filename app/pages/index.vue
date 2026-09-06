<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Zap, Orbit, Swords, BookOpen, Sparkles } from 'lucide-vue-next'
import { comics } from '~/data/comics'
const featured = comics.filter((c) => c.featured)
const newReleases = comics.filter((c) => c.isNew)
const heroComics = [comics[1]!, comics[0]!, comics[2]!]
useSeoMeta({
  title: 'CosmicComics — Find your next universe',
  description:
    'Iconic heroes. Independent voices. Your next favorite comic is waiting. Explore the CosmicComics curated demo store.',
})
</script>
<template>
  <section class="hero">
    <div class="wrap hero-layout">
      <div class="hero-copy">
        <span class="eyebrow"
          ><span class="tiny-star">✦</span> INDEPENDENT SPIRIT. INFINITE STORIES.</span
        >
        <h1>YOUR NEXT<br /><em>OBSESSION.</em><br />STARTS HERE.</h1>
        <p>
          Iconic heroes. Unexpected worlds. Stories that stay with you long after the last page.
        </p>
        <div class="hero-cta">
          <NuxtLink to="/shop" class="button primary"
            >Explore the collection <ArrowUpRight :size="20" /></NuxtLink
          ><NuxtLink to="/shop?collection=new" class="hero-secondary"
            >New releases <ArrowRight :size="18"
          /></NuxtLink>
        </div>
        <div class="hero-footnote">
          <BookOpen :size="17" /><span>Real comics. Handpicked for your next adventure.</span>
        </div>
      </div>
      <div class="hero-gallery">
        <div class="orbit-ring ring-one" />
        <div class="orbit-ring ring-two" />
        <span class="hero-asterisk">✳</span
        ><NuxtLink
          v-for="(comic, index) in heroComics"
          :key="comic.slug"
          :to="`/comics/${comic.slug}`"
          :class="['hero-cover', `hero-cover-${index}`]"
          :aria-label="`Discover ${comic.title}`"
          ><ComicCover :comic="comic" eager
        /></NuxtLink>
        <div class="hero-stamp">
          <span>ONE MORE</span><strong>ISSUE.</strong><span>YOU KNOW YOU WANT TO.</span>
        </div>
        <div class="hero-caption">
          <span>THE FIRST ISSUE IS JUST THE BEGINNING.</span><span>01 — ∞</span>
        </div>
      </div>
    </div>
  </section>
  <div class="ticker" aria-hidden="true">
    <div>
      <span>ICONIC HEROES</span><span>✦</span><span>INDIE SOUL</span><span>✦</span
      ><span>YOUR NEXT FAVORITE</span><span>✦</span><span>EVERY STORY STARTS SOMEWHERE</span
      ><span>✦</span><span>ICONIC HEROES</span><span>✦</span><span>INDIE SOUL</span>
    </div>
  </div>
  <section class="section wrap">
    <div class="section-heading">
      <div>
        <span class="eyebrow">GOOD TASTE. GREAT STORIES.</span>
        <h2>From our long box to yours<span class="yellow-dot">.</span></h2>
      </div>
      <NuxtLink class="arrow-link" to="/shop?collection=featured"
        >Shop staff picks <ArrowUpRight :size="19"
      /></NuxtLink>
    </div>
    <div class="comic-grid">
      <ComicCard v-for="comic in featured" :key="comic.slug" :comic="comic" />
    </div>
  </section>
  <section class="genre-section wrap">
    <div class="section-heading">
      <div>
        <span class="eyebrow">FOLLOW YOUR CURIOSITY</span>
        <h2>Pick your universe.</h2>
      </div>
      <span class="muted">There’s no wrong place to start.</span>
    </div>
    <div class="genre-grid">
      <NuxtLink to="/shop?genre=Superheroes" class="genre-tile"
        ><Zap :size="38" :stroke-width="1.5" /><span
          ><small>BEYOND THE CAPE</small><strong>Superheroes</strong></span
        ><ArrowUpRight /></NuxtLink
      ><NuxtLink to="/shop?genre=Sci-fi" class="genre-tile"
        ><Orbit :size="40" :stroke-width="1.5" /><span
          ><small>OUT OF THIS WORLD</small><strong>Sci-fi</strong></span
        ><ArrowUpRight /></NuxtLink
      ><NuxtLink to="/shop?genre=Fantasy" class="genre-tile"
        ><Swords :size="38" :stroke-width="1.5" /><span
          ><small>EXPECT THE IMPOSSIBLE</small><strong>Fantasy</strong></span
        ><ArrowUpRight
      /></NuxtLink>
    </div>
  </section>
  <section class="section wrap">
    <div class="section-heading">
      <div>
        <span class="eyebrow">FRESH CHAPTERS · 2026 PICKS</span>
        <h2>New releases. New possibilities.</h2>
      </div>
      <NuxtLink class="arrow-link" to="/shop?collection=new"
        >All new releases <ArrowUpRight :size="19"
      /></NuxtLink>
    </div>
    <div class="comic-grid">
      <ComicCard v-for="comic in newReleases" :key="comic.slug" :comic="comic" />
      <article class="editorial-card">
        <Sparkles :size="32" :stroke-width="1.4" /><span class="eyebrow">A FRESH PERSPECTIVE</span>
        <h3>FAMILIAR<br />HEROES.<br /><em>ABSOLUTELY</em><br />DIFFERENT.</h3>
        <p>
          Meet DC’s Absolute Universe. Big swings. Bold beginnings. A new way into the characters
          you love.
        </p>
        <NuxtLink to="/shop?publisher=DC" class="arrow-link"
          >Explore DC <ArrowUpRight :size="20"
        /></NuxtLink>
      </article>
    </div>
  </section>
  <section id="publishers" class="publisher-section">
    <div class="wrap publisher-inner">
      <div>
        <span class="eyebrow">LEGENDS & INDEPENDENT VOICES</span>
        <h2>Different publishers.<br />Same love for the story.</h2>
      </div>
      <NuxtLink to="/shop?publisher=DC" class="publisher-link"
        ><strong class="dc-mark">DC</strong
        ><span>Explore DC <ArrowUpRight :size="18" /></span></NuxtLink
      ><NuxtLink to="/shop?publisher=Image+Comics" class="publisher-link"
        ><strong class="image-mark">image<span>COMICS</span></strong
        ><span>Explore Image <ArrowUpRight :size="18" /></span
      ></NuxtLink>
    </div>
  </section>
  <section class="closing-section wrap">
    <span>✦</span>
    <h2>Go on. Get lost in a good story.</h2>
    <NuxtLink class="button dark" to="/shop"
      >Find your next read <ArrowRight :size="19"
    /></NuxtLink>
  </section>
</template>
