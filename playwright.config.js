import { defineConfig, devices } from '@playwright/test'

// Browser tests (npm run test:e2e) run against the production build served by `vite preview`.
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 120_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'off',
  },
  projects: [
    // Layout and question/answer visibility on three screens; smoke on two; features once.
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
    { name: 'phone', testIgnore: ['**/features.spec.js', '**/fretboard-exercises.spec.js'],
      use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: 'phone-land', testIgnore: ['**/features.spec.js', '**/smoke.spec.js', '**/fretboard-exercises.spec.js'],
      use: { browserName: 'chromium', viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
  ],
  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
