import { test, expect } from '@playwright/test'
import { ROUTES, collectErrors, open, START } from './helpers.js'

test.describe('every page opens without errors', () => {
  for (const path of ROUTES) {
    test(path, async ({ page }) => {
      const errors = collectErrors(page)
      await open(page, path)
      await expect(page.locator('#view-title')).not.toBeEmpty()
      const start = page.locator(START).first()
      if (await start.count() && await start.isVisible()) { await start.click(); await page.waitForTimeout(400) }
      expect(errors).toEqual([])
    })
  }
})
