<script setup lang="ts">
import { X, Minus, Plus, ShoppingBag, ArrowRight, Check, Trash2 } from 'lucide-vue-next'
import { money } from '~/data/comics'
const { open, items, count, total, update } = useCart()
const dialog = ref<HTMLDialogElement>()
const confirmed = ref(false)
let returnFocus: HTMLElement | null = null
watch(open, async (value) => {
  await nextTick()
  if (value) {
    confirmed.value = false
    returnFocus = document.activeElement as HTMLElement
    dialog.value?.showModal()
    document.body.style.overflow = 'hidden'
  } else {
    dialog.value?.close()
    document.body.style.overflow = ''
    returnFocus?.focus()
  }
})
const close = () => {
  open.value = false
}
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>
<template>
  <dialog
    ref="dialog"
    class="cart-dialog"
    aria-labelledby="cart-title"
    @cancel.prevent="close"
    @click="
      (event) => {
        if (event.target === dialog) close()
      }
    "
  >
    <div class="cart-panel">
      <div class="drawer-heading">
        <div>
          <span class="eyebrow">YOUR NEXT ADVENTURE</span>
          <h2 id="cart-title">
            Your cart <span>({{ count }})</span>
          </h2>
        </div>
        <button class="icon-button" aria-label="Close cart" @click="close"><X /></button>
      </div>
      <template v-if="items.length">
        <div class="cart-lines">
          <article v-for="line in items" :key="line.slug" class="cart-line">
            <NuxtLink :to="`/comics/${line.slug}`" @click="close"
              ><ComicCover :comic="line.comic" eager
            /></NuxtLink>
            <div class="cart-line-info">
              <span class="eyebrow">{{ line.comic.publisher }}</span>
              <h3>{{ line.comic.title }}</h3>
              <p>{{ money(line.comic.price) }} <span>each</span></p>
              <div class="quantity">
                <button
                  :aria-label="`Decrease quantity of ${line.comic.title}`"
                  @click="update(line.slug, line.quantity - 1)"
                >
                  <Minus :size="14" /></button
                ><span :aria-label="`Quantity ${line.quantity}`">{{ line.quantity }}</span
                ><button
                  :disabled="line.quantity >= 99"
                  :aria-label="`Increase quantity of ${line.comic.title}`"
                  @click="update(line.slug, line.quantity + 1)"
                >
                  <Plus :size="14" />
                </button>
              </div>
            </div>
            <button
              class="remove-item icon-button"
              :aria-label="`Remove ${line.comic.title}`"
              @click="update(line.slug, 0)"
            >
              <Trash2 :size="17" />
            </button>
          </article>
        </div>
        <div class="cart-summary">
          <div class="subtotal">
            <span>Subtotal</span><strong>{{ money(total) }}</strong>
          </div>
          <p>Illustrative prices in USD. This demo does not take payments or ship products.</p>
          <div v-if="confirmed" class="demo-confirmation" role="status">
            <Check :size="23" />
            <div>
              <strong>You’ve reached the end of the demo.</strong>
              <p>Your picks are saved here. No order was placed and no payment was taken.</p>
            </div>
          </div>
          <button v-else class="button primary wide" @click="confirmed = true">
            Try demo checkout <ArrowRight :size="19" /></button
          ><button class="text-button wide" @click="close">Keep exploring</button>
        </div>
      </template>
      <div v-else class="empty-cart">
        <ShoppingBag :size="52" :stroke-width="1" />
        <h3>A universe of stories awaits.</h3>
        <p>Your cart is empty. Let’s find your next favorite.</p>
        <NuxtLink class="button primary" to="/shop" @click="close"
          >Explore comics <ArrowRight :size="18"
        /></NuxtLink>
      </div>
    </div>
  </dialog>
</template>
