import { test, expect } from '@playwright/test'

test('catalog search, combined filters, sorting, and empty-state recovery', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/shop')
  await expect(page.locator('.comic-card')).toHaveCount(14)
  await page.getByRole('searchbox').fill('vaughan')
  await expect(page.locator('.comic-card')).toHaveCount(2)
  await page.getByLabel('Publisher', { exact: true }).selectOption('DC')
  await expect(page.getByText('No comics in this corner of the universe.')).toBeVisible()
  await page.getByRole('button', { name: 'Explore all comics', exact: true }).click()
  await expect(page.locator('.comic-card')).toHaveCount(14)
  await page.getByLabel('Genre', { exact: true }).selectOption('Fantasy')
  await expect(page.locator('.comic-card')).toHaveCount(3)
  await page.getByRole('button', { name: 'Clear all filters' }).click()
  await page.getByLabel('Sort comics', { exact: true }).selectOption('price-low')
  const prices = await page.locator('.card-bottom > strong').allTextContents()
  const values = prices.map((p) => Number(p.replace('$', '')))
  expect(values).toEqual([...values].sort((a, b) => a - b))
  await page.getByRole('searchbox').fill('saga')
  await expect(page.locator('.comic-card')).toHaveCount(1)
  await expect(page).toHaveURL(/q=saga/)
  await page.reload()
  await expect(page.locator('.comic-card')).toHaveCount(1)
  expect(errors).toEqual([])
})

test('product, persistent cart, quantity, demo checkout, and removal', async ({ page }) => {
  await page.goto('/comics/saga-1')
  await expect(page.getByRole('heading', { name: 'Saga #1', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Add to cart', exact: true }).click()
  const cart = page.getByRole('dialog')
  await expect(cart).toBeVisible()
  await page.getByRole('button', { name: 'Increase quantity of Saga #1' }).click()
  await expect(page.locator('.subtotal strong')).toHaveText('$5.98')
  await page.getByRole('button', { name: 'Try demo checkout' }).click()
  await expect(
    page.getByText('No order was placed and no payment was taken.', { exact: false }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(cart).not.toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: 'Open cart' }).click()
  await expect(page.locator('.subtotal strong')).toHaveText('$5.98')
  await page.getByRole('button', { name: 'Remove Saga #1' }).click()
  await expect(page.getByText('A universe of stories awaits.')).toBeVisible()
  await page.getByRole('button', { name: 'Close cart' }).click()
})

test('direct filtered links hydrate correctly and every cover resolves', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.text().toLowerCase().includes('hydration')) errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/shop?collection=new')
  await expect(page.locator('.comic-card')).toHaveCount(3)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('New releases.')
  await page.goto('/shop')
  for (const img of await page.locator('.comic-card img').all()) {
    await img.scrollIntoViewIfNeeded()
    await expect(img).toBeVisible()
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBeTruthy()
  }
  expect(errors).toEqual([])
})

test('responsive navigation, layout, and missing-page recovery', async ({ page }, testInfo) => {
  await page.goto('/')
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'New releases' })
      .click()
    await expect(page.getByRole('heading', { name: 'New releases.', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  }
  for (const path of ['/', '/shop', '/comics/absolute-batman-1', '/about']) {
    await page.goto(path)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    ).toBeTruthy()
  }
  const response = await page.goto('/comics/this-comic-does-not-exist')
  expect(response?.status()).toBe(404)
  await page.getByRole('button', { name: 'Back to the collection' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Find your next universe.')
})
