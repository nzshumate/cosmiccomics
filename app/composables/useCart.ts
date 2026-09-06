import { comics } from '~/data/comics'
import type { CartLine } from '~/types/comic'
export const useCart = () => {
  const ready = useState('cart-ready', () => false)
  const lines = useState<CartLine[]>('cart', () => [])
  const open = useState('cart-open', () => false)
  const items = computed(() =>
    lines.value.flatMap((line) => {
      const comic = comics.find((c) => c.slug === line.slug)
      return comic ? [{ ...line, comic }] : []
    }),
  )
  const count = computed(() => items.value.reduce((total, line) => total + line.quantity, 0))
  const total = computed(
    () =>
      items.value.reduce(
        (sum, line) => sum + Math.round(line.comic.price * 100) * line.quantity,
        0,
      ) / 100,
  )
  const add = (slug: string) => {
    if (!comics.some((c) => c.slug === slug)) return
    const line = lines.value.find((l) => l.slug === slug)
    if (line) line.quantity = Math.min(99, line.quantity + 1)
    else lines.value.push({ slug, quantity: 1 })
    open.value = true
  }
  const update = (slug: string, quantity: number) => {
    if (quantity <= 0) lines.value = lines.value.filter((l) => l.slug !== slug)
    else {
      const line = lines.value.find((l) => l.slug === slug)
      if (line) line.quantity = Math.min(99, Math.floor(quantity))
    }
  }
  return { lines, open, items, count, total, add, update, ready }
}
