import { expect, test } from '@playwright/test';

async function openRoute(route: string, page: import('@playwright/test').Page) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  await expect(page.locator('app-root')).toBeVisible();
}

test.describe('ci smoke', () => {
  test('table route renders and paginates', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Table', page);

    const nextPageButton = page.locator('.magary-paginator-next').first();
    await expect(nextPageButton).toBeVisible();
    await nextPageButton.click();
    await expect(page.locator('.magary-paginator-page-active').first()).toHaveText(
      '2',
    );
  });

  test('dialog route opens a modal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Dialog', page);

    await page
      .getByRole('button', { name: 'Show Basic Dialog' })
      .first()
      .click();
    await expect(page.locator('.magary-dialog[role="dialog"]:visible')).toHaveCount(
      1,
    );
  });

  test('input route accepts typing', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Input', page);

    const input = page.locator('magary-input input').first();
    await expect(input).toBeVisible();
    await input.fill('ci-smoke');
    await expect(input).toHaveValue('ci-smoke');
  });

  test('sidebar route renders navigation sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Sidebar', page);

    await expect(page.locator('magary-sidebar').first()).toBeVisible();
    await expect(page.locator('magary-panelmenu').first()).toBeVisible();
  });
});
