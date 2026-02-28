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

  test('table inline numeric input blur does not throw runtime errors', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const pageErrors: Error[] = [];
    const consoleErrors: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error);
    });
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    await openRoute('/components/Table', page);

    const templateSectionTitle = page.getByRole('heading', {
      name: /Templates (?:&|and|e) Inline Editing/i,
    });
    await templateSectionTitle.scrollIntoViewIfNeeded();
    await expect(templateSectionTitle).toBeVisible();

    const inlinePriceInput = page.locator('input[aria-label*="Bamboo Watch"]').first();
    await expect(inlinePriceInput).toBeVisible();
    await inlinePriceInput.click();
    await inlinePriceInput.fill('66');
    await templateSectionTitle.click();

    await page.waitForTimeout(150);

    expect(pageErrors).toEqual([]);
    expect(
      consoleErrors.some((message) =>
        message.toLowerCase().includes('trim is not a function'),
      ),
    ).toBe(false);
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

    await page.keyboard.press('Escape');
    await expect(page.locator('.magary-dialog[role="dialog"]:visible')).toHaveCount(
      0,
    );
  });

  test('overlay panel route opens and closes with escape', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/OverlayPanel', page);

    const trigger = page.getByRole('button', { name: 'Toggle Overlay' }).first();
    await expect(trigger).toBeVisible();

    await trigger.click();
    const overlay = page.locator('.magary-overlaypanel[role="dialog"]:visible').first();
    await expect(overlay).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(page.locator('.magary-overlaypanel[role="dialog"]:visible')).toHaveCount(
      0,
    );
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('input route accepts typing', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Input', page);

    const input = page.locator('magary-input input').first();
    await expect(input).toBeVisible();
    await input.fill('ci-smoke');
    await expect(input).toHaveValue('ci-smoke');
  });

  test('input route covers loading, error and disabled states', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Input', page);

    const errorInput = page.getByLabel('Error').first();
    await expect(errorInput).toBeVisible();
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
    await expect(
      page.locator('magary-input', { has: page.getByLabel('Error').first() }),
    ).toContainText(/Mensaje de error|Error message/i);

    const loadingInput = page.getByLabel('Loading').first();
    await expect(loadingInput).toBeVisible();
    await expect(loadingInput).toHaveClass(/input-loading/);
    const loadingInputContainer = page.locator('magary-input', {
      has: page.getByLabel('Loading').first(),
    });
    await expect(
      loadingInputContainer.locator('lucide-icon.loading-icon').first(),
    ).toBeVisible();

    const disabledInput = page.getByLabel(/Deshabilitado|Disabled/i).first();
    await expect(disabledInput).toBeVisible();
    await expect(disabledInput).toBeDisabled();
    await expect(disabledInput).toHaveValue(/Deshabilitado|Disabled/i);
  });

  test('setup route exposes integration examples and navigates to demo references', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/setup', page);

    await expect(page.getByRole('heading', { name: 'Integration Examples (Demo App)' })).toBeVisible();
    await expect(page.getByText('Standalone bootstrap:')).toBeVisible();
    await expect(page.getByText('Reactive forms bridge:')).toBeVisible();
    await expect(page.getByText('Overlay + feedback flow:')).toBeVisible();

    const formIntegrationButton = page
      .getByRole('button', { name: 'Form Integration' })
      .first();
    await expect(formIntegrationButton).toBeVisible();
    await formIntegrationButton.click();
    await expect(page).toHaveURL(/\/components\/Input$/);
    await expect(page.locator('app-root')).toBeVisible();
  });

  test('sidebar route renders navigation sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Sidebar', page);

    await expect(page.locator('magary-sidebar').first()).toBeVisible();
    await expect(page.locator('magary-panelmenu').first()).toBeVisible();
  });

  test('tree route supports keyboard expand and filter', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/tree', page);

    const trees = page.locator('magary-tree');
    await expect(trees).toHaveCount(3);

    const basicTree = trees.nth(0);
    const firstNode = basicTree.locator('.magary-treenode-content').first();
    await expect(firstNode).toBeVisible();
    await firstNode.focus();
    await firstNode.press('ArrowRight');
    await expect(basicTree.getByText('Work').first()).toBeVisible();

    const filterTree = trees.nth(1);
    const filterInput = page
      .getByPlaceholder(/Buscar documentos\.\.\.|Search documents\.\.\./i)
      .first();
    await expect(filterInput).toBeVisible();
    await filterInput.fill('work');
    await expect(filterTree.getByText('Work').first()).toBeVisible();
  });

  test('organization chart route supports selection and collapse', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/organization-chart', page);

    const chart = page.locator('magary-organization-chart').first();
    await expect(chart).toBeVisible();

    const firstNode = chart.locator('.magary-organizationchart-node-content').first();
    await firstNode.click();
    await expect(page.getByText(/Seleccionado:|Selected:/).first()).toContainText(
      'CEO',
    );

    const toggler = chart.locator('.magary-organizationchart-toggler').first();
    await expect(toggler).toHaveAttribute('aria-label', 'Collapse CEO');

    await toggler.click();
    await expect(
      chart.locator('.magary-organizationchart-node-label', { hasText: 'COO' }),
    ).toHaveCount(0);

    await toggler.click();
    await expect(
      chart.locator('.magary-organizationchart-node-label', { hasText: 'COO' }),
    ).toHaveCount(1);
  });

  test('tabview route supports keyboard tab navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/tabview', page);

    const tabs = page.locator('magary-tabs').first();
    await expect(tabs).toBeVisible();

    const tabButtons = tabs.locator('.tab-headers button');
    await expect(tabButtons.first()).toHaveAttribute('aria-selected', 'true');

    await tabButtons.first().focus();
    await tabButtons.first().press('ArrowRight');

    await expect(tabButtons.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.getByText('Tu perfil').first()).toBeVisible();
  });

  test('carousel route supports keyboard navigation and aria indicators', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/view-carousel', page);

    const carousel = page.locator('magary-carousel').nth(1);
    await expect(carousel).toBeVisible();

    const wrapper = carousel.locator('.magary-carousel-wrapper').first();
    const indicators = carousel.locator('.magary-carousel-indicator');
    await expect(indicators.first()).toHaveAttribute('aria-selected', 'true');

    await wrapper.focus();
    await wrapper.press('ArrowRight');

    await expect(indicators.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(carousel.locator('.magary-carousel-live-region')).toContainText(
      'Slide 2 of',
    );
  });

  test('tooltip route shows and hides tooltip with keyboard escape', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Tooltip', page);

    const topButton = page.getByRole('button', { name: 'Top' }).first();
    await expect(topButton).toBeVisible();

    await topButton.hover();
    const tooltip = page.locator('.magary-tooltip:visible').first();
    await expect(tooltip).toContainText('Tooltip on Top');

    await page.keyboard.press('Escape');
    await expect(page.locator('.magary-tooltip:visible')).toHaveCount(0);
  });

  test('sidebar mobile menu opens and closes with escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openRoute('/components/Sidebar', page);

    const hamburger = page.locator('magary-sidebar .hamburger-button').first();
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('magary-sidebar .sidebar.open').first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  test('table route paginates on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openRoute('/components/Table', page);

    const nextPageButton = page.locator('.magary-paginator-next').first();
    await expect(nextPageButton).toBeVisible();
    await nextPageButton.click();
    await expect(page.locator('.magary-paginator-page-active').first()).toHaveText(
      '2',
    );
  });

  test('select route opens dropdown and selects an option', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Select', page);

    const trigger = page.locator('.magary-select-container').first();
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText('Select a city');

    await trigger.click();
    const overlay = page.locator('.cdk-overlay-container .select-overlay').first();
    await expect(overlay).toBeVisible();

    const overlayRadius = await overlay.evaluate((element) =>
      getComputedStyle(element).borderTopLeftRadius,
    );
    expect(Number.parseFloat(overlayRadius)).toBeGreaterThan(0);

    const firstOption = overlay.locator('.select-item').first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await expect(trigger).not.toContainText('Select a city');
  });

  test('segmented route supports click, keyboard and ngModel sync', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Segmented', page);

    const segmentedPage = page.locator('app-view-segmented');
    const segmentedGroups = segmentedPage.getByRole('radiogroup');

    const languageGroup = segmentedGroups.first();
    await expect(languageGroup).toBeVisible();

    const languageOptions = languageGroup.getByRole('radio');
    await expect(languageOptions).toHaveCount(2);
    await expect(languageOptions.nth(0)).toHaveAttribute('aria-checked', 'true');

    await languageOptions.nth(1).click();
    await expect(languageOptions.nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(page.locator('.value-pill').first()).toContainText('en');

    await languageOptions.nth(1).focus();
    await languageOptions.nth(1).press('ArrowRight');
    await expect(languageOptions.nth(0)).toHaveAttribute('aria-checked', 'true');
    await expect(page.locator('.value-pill').first()).toContainText('es');

    const formGroup = segmentedGroups.last();
    await expect(formGroup).toBeVisible();
    const formEnOption = formGroup.getByRole('radio', { name: 'en' });
    await formEnOption.click();
    await expect(page.locator('.value-pill').nth(2)).toContainText('en');
  });

  test('cascade select route opens nested options and selects a leaf', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await openRoute('/components/Cascade-Select', page);

    const cascade = page.locator('magary-cascade-select').first();
    const trigger = cascade.locator('.magary-cascade-select').first();
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText(/Select a city|Selecciona una ciudad/i);

    await trigger.click();
    const panel = cascade.locator('.select-panel').first();
    await expect(panel).toBeVisible();

    const panelRadius = await panel.evaluate((element) =>
      getComputedStyle(element).borderTopLeftRadius,
    );
    expect(Number.parseFloat(panelRadius)).toBeGreaterThan(0);

    const country = panel.locator('.select-item', { hasText: 'Australia' }).first();
    await country.hover();

    const state = panel
      .locator('.submenu .select-item', { hasText: 'New South Wales' })
      .first();
    await expect(state).toBeVisible();
    await state.hover();

    const city = panel
      .locator('.submenu .submenu .select-item', { hasText: 'Sydney' })
      .first();
    await expect(city).toBeVisible();
    await city.click();

    await expect(trigger).toContainText('Sydney');
  });
});
