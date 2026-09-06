<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>()
</script>
<template>
  <div class="error-page">
    <span class="brand-star">✦</span
    ><span class="eyebrow">{{ error.statusCode || 500 }} / UNCHARTED TERRITORY</span>
    <h1>This universe is<br />still undiscovered.</h1>
    <p>
      {{
        error.statusCode === 404
          ? 'We couldn’t find that page. Your next favorite comic is still out there.'
          : 'Something interrupted the story. Let’s return to the collection.'
      }}
    </p>
    <button class="button primary" @click="clearError({ redirect: '/shop' })">
      Back to the collection →
    </button>
  </div>
</template>
