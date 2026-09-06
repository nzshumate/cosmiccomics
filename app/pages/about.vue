<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { comics } from '~/data/comics'
useSeoMeta({ title: 'About & cover credits — CosmicComics' })
</script>
<template>
  <div class="about-page wrap">
    <span class="eyebrow">INDEPENDENT SPIRIT. INFINITE STORIES.</span>
    <h1>Built for the love<br />of the story.</h1>
    <p class="about-lead">
      CosmicComics is a demonstration storefront for discovering extraordinary comics. Every title
      in the collection is real. Every cover comes from an official publisher’s website.
    </p>
    <div class="about-panels">
      <section>
        <h2>A shop to explore.</h2>
        <p>
          Browse, search, filter, and build a cart. Your cart is saved on this device when browser
          storage is available. Checkout is a demonstration only: no payment details are collected,
          no orders are placed, and no products are shipped.
        </p>
      </section>
      <section>
        <h2>Real stories. Demo prices.</h2>
        <p>
          Prices are illustrative USD values, not current offers, stock guarantees, or valuations of
          collectible first printings. The curated new-release selection features 2026 titles; it is
          not a live inventory feed.
        </p>
      </section>
    </div>
    <section id="credits">
      <h2>Creators deserve the credit.</h2>
      <p>
        Cover artwork, characters, and comic titles belong to their respective rights holders.
        Images are displayed from publisher-hosted URLs for identification in this non-commercial
        demo. Public availability does not make the art public domain. CosmicComics is not
        affiliated with or endorsed by DC or Image Comics.
      </p>
      <div class="credits-list">
        <a
          v-for="comic in comics"
          :key="comic.slug"
          :href="comic.source"
          target="_blank"
          rel="noopener noreferrer"
          ><span
            >{{ comic.title
            }}<small>{{ comic.publisher }} · {{ comic.writer }} / {{ comic.artist }}</small></span
          ><ArrowUpRight :size="20"
        /></a>
      </div>
    </section>
  </div>
</template>
