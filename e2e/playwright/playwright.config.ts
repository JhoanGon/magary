import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4300';

export default defineConfig({
  testDir: './specs',
  outputDir: './test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: './report', open: 'never' }],
  ],
  fullyParallel: false,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    },
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  snapshotPathTemplate: '{testDir}/../snapshots/{testFilePath}/{arg}{ext}',
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'pnpm exec ng serve demo-app --host 127.0.0.1 --port 4300',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
