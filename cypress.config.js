import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {},
  },
  env: {
    TEST_EMAIL:    '',
    TEST_PASSWORD: '',
  },
})
