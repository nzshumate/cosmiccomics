<script setup lang="ts">
import { Search, X, SlidersHorizontal, ArrowUpRight } from 'lucide-vue-next'
import { comics } from '~/data/comics'
const { ready } = useCart()
const route = useRoute()
const router = useRouter()
const value = (key: string) =>
  typeof route.query[key] === 'string' ? (route.query[key] as string) : ''
const query = ref(value('q'))
const publisher = computed({ get: () => value('publisher'), set: (v) => setFilter('publisher', v) })
const genre = computed({ get: () => value('genre'), set: (v) => setFilter('genre', v) })
const collection = computed(() => value('collection'))
const sort = computed({ get: () => value('sort') || 'featured', set: (v) => setFilter('sort', v) })
function setFilter(key: string, v: string) {
  router.replace({ path: '/shop', query: { ...route.query, [key]: v || undefined } })
}
let timer: ReturnType<typeof setTimeout>
watch(query, (q) => {
  clearTimeout(timer)
  timer = setTimeout(() => setFilter('q', q.trim()), 180)
})
watch(
  () => route.query.q,
  () => {
    if (query.value.trim() !== value('q')) query.value = value('q')
  },
)
onBeforeUnmount(() => clearTimeout(timer))
const filtered = computed(() => {
  const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const result = comics.filter(
    (c) =>
      (!publisher.value || c.publisher === publisher.value) &&
      (!genre.value || c.genre === genre.value) &&
      (collection.value !== 'new' || c.isNew) &&
      (collection.value !== 'featured' || c.featured) &&
      terms.every((t) =>
        `${c.title} ${c.writer} ${c.artist} ${c.genre} ${c.publisher}`.toLowerCase().includes(t),
      ),
  )
  if (sort.value === 'price-low') result.sort((a, b) => a.price - b.price)
  if (sort.value === 'price-high') result.sort((a, b) => b.price - a.price)
  if (sort.value === 'title') result.sort((a, b) => a.title.localeCompare(b.title))
  if (sort.value === 'newest') result.sort((a, b) => b.year - a.year)
  return result
})
const active = computed(() => query.value || publisher.value || genre.value || collection.value)
const clear = () => {
  query.value = ''
  router.replace('/shop')
}
const heading = computed(() =>
  collection.value === 'new'
    ? 'New releases.'
    : collection.value === 'featured'
      ? 'The staff picks.'
      : 'Find your next universe.',
)
const searchInput = ref<HTMLInputElement>()
onMounted(() => {
  if (route.query.search) searchInput.value?.focus()
})
useSeoMeta({
  title: () => `${heading.value} — CosmicComics`,
  description:
    'Browse real comic books by title, creator, publisher, and genre. Find your next read at CosmicComics.',
})
</script>
<template>
  <div class="shop-page wrap">
    <div class="breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><span>/</span><span>The collection</span>
    </div>
    <div class="shop-heading">
      <div>
        <span class="eyebrow">THE COSMIC COLLECTION</span>
        <h1>{{ heading }}</h1>
        <p>
          {{
            collection === 'new'
              ? 'A curated selection of 2026 releases from DC’s Absolute Universe.'
              : 'Iconic first issues, independent gems, and fresh chapters. It’s all here.'
          }}
        </p>
      </div>
      <span class="shop-spark">✦</span>
    </div>
    <form class="catalog-search" role="search" @submit.prevent="setFilter('q', query.trim())">
      <Search :size="22" /><label class="sr-only" for="catalog-search"
        >Search titles, creators, or publishers</label
      ><input
        id="catalog-search"
        :disabled="!ready"
        ref="searchInput"
        v-model="query"
        type="search"
        placeholder="Search titles, creators, or publishers…"
        autocomplete="off"
      /><button
        v-if="query"
        type="button"
        class="icon-button"
        aria-label="Clear search"
        @click="query = ''"
      >
        <X :size="18" />
      </button>
    </form>
    <div class="collection-tabs" aria-label="Collections">
      <NuxtLink :class="{ selected: !collection }" to="/shop"
        >All comics <span>{{ comics.length }}</span></NuxtLink
      ><NuxtLink :class="{ selected: collection === 'featured' }" to="/shop?collection=featured"
        >Staff picks</NuxtLink
      ><NuxtLink :class="{ selected: collection === 'new' }" to="/shop?collection=new"
        >New releases</NuxtLink
      >
    </div>
    <div class="filters">
      <span class="filter-heading"><SlidersHorizontal :size="17" /> Filter by</span
      ><label
        ><span class="sr-only">Publisher</span
        ><select :disabled="!ready" v-model="publisher" aria-label="Publisher">
          <option value="">All publishers</option>
          <option>DC</option>
          <option>Image Comics</option>
        </select></label
      ><label
        ><span class="sr-only">Genre</span
        ><select :disabled="!ready" v-model="genre" aria-label="Genre">
          <option value="">All genres</option>
          <option>Superheroes</option>
          <option>Sci-fi</option>
          <option>Fantasy</option>
        </select></label
      ><label class="sort-filter"
        ><span>Sort:</span
        ><select :disabled="!ready" v-model="sort" aria-label="Sort comics">
          <option value="featured">Featured</option>
          <option value="newest">Newest first</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="title">Title: A–Z</option>
        </select></label
      >
    </div>
    <div class="results-bar">
      <p role="status" aria-live="polite">
        {{ filtered.length }} {{ filtered.length === 1 ? 'comic' : 'comics'
        }}{{ query ? ` for “${query}”` : ' to discover' }}
      </p>
      <button v-if="active" class="text-button" @click="clear">
        Clear all filters <X :size="14" /></button
      ><span v-else class="muted">Demo prices · USD</span>
    </div>
    <div v-if="filtered.length" class="comic-grid catalog-grid">
      <ComicCard
        v-for="(comic, index) in filtered"
        :key="comic.slug"
        :comic="comic"
        :eager="index < 4"
      />
    </div>
    <div v-else class="empty-results">
      <Search :size="44" :stroke-width="1.2" />
      <h2>No comics in this corner of the universe.</h2>
      <p>Try another title or creator, or give your filters a fresh start.</p>
      <button class="button dark" @click="clear">
        Explore all comics <ArrowUpRight :size="18" />
      </button>
    </div>
  </div>
</template>
