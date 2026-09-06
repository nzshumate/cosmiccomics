import { comics } from '~/data/comics'
import type { CartLine } from '~/types/comic'
export default defineNuxtPlugin((nuxtApp) => {
  const { lines, ready } = useCart()
  nuxtApp.hook('app:mounted', () => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('cosmic-cart-v1') || '[]')
      if (Array.isArray(saved)) {
        const valid = saved.filter(
          (l): l is CartLine =>
            l &&
            typeof l.slug === 'string' &&
            comics.some((c) => c.slug === l.slug) &&
            Number.isInteger(l.quantity) &&
            l.quantity > 0 &&
            l.quantity <= 99,
        )
        lines.value = valid.filter(
          (line, index) => valid.findIndex((l) => l.slug === line.slug) === index,
        )
      }
    } catch {
      /* Storage can be unavailable in privacy modes. The cart still works in memory. */
    }
    ready.value = true
    watch(
      lines,
      (value) => {
        try {
          localStorage.setItem('cosmic-cart-v1', JSON.stringify(value))
        } catch {
          /* Keep the active cart usable. */
        }
      },
      { deep: true },
    )
  })
})
