<script setup lang="ts">
import type { Comic } from '~/types/comic'
defineProps<{ comic: Comic; eager?: boolean }>()
const loaded = ref(false)
const failed = ref(false)
</script>
<template>
  <div class="cover" :class="{ 'is-loaded': loaded, 'is-failed': failed }">
    <img
      v-if="!failed"
      :src="comic.image"
      :alt="`${comic.title} — official cover`"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      width="420"
      height="640"
      @load="loaded = true"
      @error="failed = true"
    />
    <div v-else class="cover-fallback">
      <span>Cover unavailable</span><strong>{{ comic.title }}</strong
      ><small>View the publisher source on the detail page.</small>
    </div>
  </div>
</template>
