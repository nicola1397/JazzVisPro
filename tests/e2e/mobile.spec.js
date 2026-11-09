import { test, expect } from '@playwright/test'
import { open } from './helpers.js'

test('key and scale can be changed under the neck when the sidebar is hidden', async ({ page }, info) => {
  test.skip(info.project.name === 'desktop', 'the sidebar is there on desktop')
  await open(page, '/explorer')
  const chip = page.locator('.ksc-chip')
  await expect(chip).toBeVisible()
  await chip.click()
  await page.locator('.ksc-panel select').nth(1).selectOption('F')
  await page.locator('.ksc-head button').click()
  await expect(page.locator('.ksc-panel')).toHaveCount(0)
  await expect(chip).toContainText('F')
})
