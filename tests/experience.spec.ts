import { test, expect } from '@playwright/test'

test('every route renders without runtime errors or missing local photographs', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of ['/', '/menu', '/reservations', '/story', '/events']) {
    await page.goto(route)
    await expect(page.locator('h1')).toBeVisible()
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBeTruthy()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
  }
  expect(errors).toEqual([])
})

test('menu tabs support keyboard navigation and dietary filtering persists', async ({ page }) => {
  await page.goto('/menu')
  await page.getByRole('tab', { name: 'À la carte' }).click()
  await page.getByRole('button', { name: 'Vegan', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Heirloom tomato' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Karoo lamb' })).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('button', { name: 'Vegan', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('tab', { name: 'À la carte' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Desserts' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: 'Citrus in three textures' })).toBeVisible()
  await page.getByRole('button', { name: 'A little more' }).click()
  await expect(page.getByText('We work directly with our growers', { exact: false })).toBeVisible()
})

test('booking completes only with a selected time and valid guest details', async ({ page }) => {
  await page.goto('/reservations')
  await page.getByRole('button', { name: '4 guests', exact: true }).click()
  await page.getByRole('button', { name: 'Choose date & time' }).click()
  await expect(page.getByRole('button', { name: 'Your details', exact: true })).toBeDisabled()
  await page.locator('.time-grid button:not([disabled])').first().click()
  await page.getByRole('button', { name: 'Your details', exact: true }).click()
  await page.getByRole('button', { name: 'Confirm reservation' }).click()
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
  await page.getByLabel('Full name').fill('Jamie Guest')
  await page.getByLabel('Email address').fill('jamie@example.com')
  await page.getByLabel('Phone number').fill('+27 82 123 4567')
  await page.getByLabel('Dietary preference').selectOption('Vegetarian')
  await page.getByRole('button', { name: 'Confirm reservation' }).click()
  await expect(page.getByText('YOUR DEMO RESERVATION IS COMPLETE')).toBeVisible()
  await expect(page.locator('.confirmation-details')).toContainText('4 guests')
  await expect(page.locator('.confirmation-details')).toContainText('Vegetarian')
  await page.getByRole('button', { name: 'Add to calendar' }).click()
  await expect(page.getByRole('status')).toContainText('Calendar preview added')
  expect(await page.evaluate(() => localStorage.getItem('et-last-booking'))).not.toContain('jamie@example.com')
})

test('private inquiry validates capacity and the gallery restores keyboard focus', async ({ page }) => {
  await page.goto('/events')
  const inquiry = page.getByRole('button', { name: 'Enquire about this space' }).first()
  await inquiry.click()
  const modal = page.getByRole('dialog')
  await modal.getByRole('button', { name: 'Send demo inquiry' }).click()
  await expect(modal.getByText('Please enter your name.')).toBeVisible()
  await modal.getByLabel('Your name').fill('Sam Host')
  await modal.getByLabel('Email address').fill('sam@example.com')
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 30)
  await modal.getByLabel('Preferred date').fill(`${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`)
  await modal.getByLabel('Number of guests').fill('25')
  await modal.getByRole('button', { name: 'Send demo inquiry' }).click()
  await expect(modal.getByText('This format accommodates 8–12 guests.')).toBeVisible()
  await modal.getByLabel('Number of guests').fill('10')
  await modal.getByRole('button', { name: 'Send demo inquiry' }).click()
  await expect(modal.getByText('Your demo inquiry is complete.', { exact: false })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(modal).toHaveCount(0)
  await expect(inquiry).toBeFocused()
  const firstPhoto = page.getByRole('button', { name: 'View photograph:', exact: false }).first()
  await firstPhoto.click()
  await expect(page.getByRole('dialog')).toContainText('1 / 4')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('dialog')).toContainText('2 / 4')
  await page.keyboard.press('Escape')
  await expect(firstPhoto).toBeFocused()
})

test('mobile pages fit the viewport and theme survives reload', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.locator('#mobile-nav').getByRole('link', { name: 'The menu' }).click()
  await expect(page.locator('#mobile-nav')).toHaveCount(0)
  for (const route of ['/', '/menu', '/reservations', '/story', '/events']) {
    await page.goto(route)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
    if (route !== '/reservations') await expect(page.locator('.mobile-sticky')).toBeVisible()
  }
})

test('small phone and tablet compositions fit without horizontal overflow', async ({ page }) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 960 })
    for (const route of ['/', '/menu', '/reservations', '/story', '/events']) {
      await page.goto(route)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} at ${width}px`).toBeTruthy()
    }
  }
})

test('failed images show branded artwork and gallery navigation recovers', async ({ page }) => {
  await page.route('**/images/room.jpg', route => route.abort())
  await page.goto('/events')
  await expect(page.locator('.events-hero .photo-fallback')).toBeVisible()
  await page.getByRole('button', { name: 'View photograph:', exact: false }).first().click()
  await expect(page.getByRole('dialog').locator('.photo-fallback')).toBeVisible()
  await page.getByRole('button', { name: 'Next photograph' }).click()
  await expect(page.getByRole('dialog').locator('img')).toBeVisible()
  await expect(page.getByRole('dialog').locator('.photo-fallback')).toHaveCount(0)
})

test('a different date resets the chosen time and Sunday offers lunch slots', async ({ page }) => {
  await page.goto('/reservations')
  await page.getByRole('button', { name: 'Choose date & time' }).click()
  await page.locator('.time-grid button:not([disabled])').first().click()
  let sunday = page.locator('.calendar-grid button[aria-label^="Sunday"]:not([disabled])').first()
  if (await sunday.count() === 0) {
    await page.getByRole('button', { name: 'Next month' }).click()
    sunday = page.locator('.calendar-grid button[aria-label^="Sunday"]:not([disabled])').first()
  }
  await sunday.click()
  await expect(page.getByRole('button', { name: 'Your details', exact: true })).toBeDisabled()
  await expect(page.locator('.time-grid')).toContainText('12:00')
  await expect(page.locator('.time-grid')).not.toContainText('17:30')
})
