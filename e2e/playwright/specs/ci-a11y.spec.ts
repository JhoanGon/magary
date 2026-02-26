import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

async function openRoute(page: import('@playwright/test').Page, route: string) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  await expect(page.locator('app-root')).toBeVisible();
}

function toA11ySummary(violations: readonly { id: string; impact?: string | null; help: string; nodes: readonly { target: readonly string[] }[] }[]) {
  return violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.map((node) => node.target.join(' ')),
  }));
}

async function expectNoSeriousA11yIssues(
  page: import('@playwright/test').Page,
  route: string,
  prepare?: (page: import('@playwright/test').Page) => Promise<void>,
) {
  await openRoute(page, route);

  if (prepare) {
    await prepare(page);
    await page.waitForLoadState('networkidle');
  }

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .disableRules(['color-contrast'])
    .analyze();

  const blockers = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact ?? ''),
  );

  expect(toA11ySummary(blockers)).toEqual([]);
}

test.describe('ci a11y smoke', () => {
  test('table route has no serious/critical a11y violations', async ({ page }) => {
    await expectNoSeriousA11yIssues(page, '/components/Table');
  });

  test('dialog route (opened state) has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/Dialog', async (currentPage) => {
      await currentPage
        .getByRole('button', { name: 'Show Basic Dialog' })
        .first()
        .click();
      await expect(
        currentPage.locator('.magary-dialog[role="dialog"]:visible'),
      ).toHaveCount(1);
    });
  });

  test('overlay panel route (opened state) has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(
      page,
      '/components/OverlayPanel',
      async (currentPage) => {
        await currentPage
          .getByRole('button', { name: 'Toggle Overlay' })
          .first()
          .click();
        await expect(
          currentPage.locator('.magary-overlaypanel[role="dialog"]:visible'),
        ).toHaveCount(1);
      },
    );
  });

  test('input route has no serious/critical a11y violations', async ({ page }) => {
    await expectNoSeriousA11yIssues(page, '/components/Input');
  });

  test('sidebar route has no serious/critical a11y violations', async ({ page }) => {
    await expectNoSeriousA11yIssues(page, '/components/Sidebar');
  });

  test('tree route has no serious/critical a11y violations', async ({ page }) => {
    await expectNoSeriousA11yIssues(page, '/components/tree');
  });

  test('organization chart route has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/organization-chart');
  });

  test('tabview route has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/tabview');
  });

  test('carousel route has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/view-carousel');
  });

  test('tooltip route (visible state) has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/Tooltip', async (currentPage) => {
      const topButton = currentPage.getByRole('button', { name: 'Top' }).first();
      await topButton.hover();
      await expect(currentPage.locator('.magary-tooltip:visible')).toHaveCount(1);
    });
  });

  test('select route (opened state) has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/Select', async (currentPage) => {
      const trigger = currentPage.locator('.magary-select-container').first();
      await trigger.click();
      await expect(currentPage.locator('.select-overlay:visible')).toHaveCount(1);
    });
  });
});
