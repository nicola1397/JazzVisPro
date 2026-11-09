import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  worker: { format: 'es' },
  // Unit tests (npm test); browser tests live in tests/e2e and run with Playwright
  test: {
    include: ['tests/unit/**/*.test.js'],
    environment: 'node',
    setupFiles: ['tests/unit/setup.js'],
  },
})
