import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('artifacts/screenshots', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
for (const route of ['', 'menu', 'reservations', 'story', 'events']) {
  await page.goto(`http://localhost:5173/${route}`)
  await page.evaluate(async () => { await document.fonts.ready })
  await page.screenshot({ path: `artifacts/screenshots/${route || 'home'}-desktop.png`, fullPage: true })
}
await page.goto('http://localhost:5173/')
await page.getByRole('button', { name: 'Switch to dark mode' }).click()
await page.screenshot({ path: 'artifacts/screenshots/home-dark.png', fullPage: true })
await page.setViewportSize({ width: 390, height: 844 })
for (const route of ['', 'menu', 'reservations', 'events']) {
  await page.goto(`http://localhost:5173/${route}`)
  await page.screenshot({ path: `artifacts/screenshots/${route || 'home'}-mobile.png`, fullPage: true })
}
await browser.close()
console.log('Desktop, dark-theme, and mobile screenshots saved.')
