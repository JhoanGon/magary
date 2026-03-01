import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';

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

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

function parseRgbColor(value: string): RgbColor {
  const match = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)/i,
  );
  if (!match) {
    throw new Error(`Unsupported color format: ${value}`);
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function toRelativeLuminance(color: RgbColor): number {
  const toLinear = (channel: number): number => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const r = toLinear(color.r);
  const g = toLinear(color.g);
  const b = toLinear(color.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio(foreground: RgbColor, background: RgbColor): number {
  const foregroundLum = toRelativeLuminance(foreground);
  const backgroundLum = toRelativeLuminance(background);
  const lighter = Math.max(foregroundLum, backgroundLum);
  const darker = Math.min(foregroundLum, backgroundLum);
  return (lighter + 0.05) / (darker + 0.05);
}

async function readEffectiveTextAndBackground(locator: Locator): Promise<{
  foreground: string;
  background: string;
}> {
  return locator.evaluate((element) => {
    const isTransparent = (color: string): boolean => {
      if (!color || color === 'transparent') {
        return true;
      }

      const rgbaMatch = color.match(
        /rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+(?:\s*,\s*([\d.]+)\s*)?\)/i,
      );
      if (!rgbaMatch) {
        return false;
      }

      const alpha = rgbaMatch[1] ? Number(rgbaMatch[1]) : 1;
      return alpha === 0;
    };

    const computed = getComputedStyle(element);
    let background = computed.backgroundColor;
    let current: HTMLElement | null = element.parentElement;

    while (current && isTransparent(background)) {
      background = getComputedStyle(current).backgroundColor;
      current = current.parentElement;
    }

    if (isTransparent(background)) {
      background = getComputedStyle(document.body).backgroundColor;
    }

    return {
      foreground: computed.color,
      background,
    };
  });
}

async function expectMinimumContrast(locator: Locator, minRatio: number): Promise<void> {
  const { foreground, background } = await readEffectiveTextAndBackground(locator);
  const ratio = calculateContrastRatio(
    parseRgbColor(foreground),
    parseRgbColor(background),
  );

  expect(
    ratio,
    `Expected contrast >= ${minRatio}; got ${ratio.toFixed(2)} for fg=${foreground} bg=${background}`,
  ).toBeGreaterThanOrEqual(minRatio);
}

async function expectVisibleFocusIndicator(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();

  const before = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
      boxShadow: style.boxShadow,
      borderColor: style.borderColor,
    };
  });

  await locator.focus();

  const after = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
      boxShadow: style.boxShadow,
      borderColor: style.borderColor,
    };
  });

  const styleChanged =
    before.outline !== after.outline ||
    before.boxShadow !== after.boxShadow ||
    before.borderColor !== after.borderColor;

  const hasFocusDecoration =
    after.boxShadow !== 'none' ||
    (!after.outline.startsWith('none') && !after.outline.includes(' 0px '));

  expect(styleChanged || hasFocusDecoration).toBe(true);
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

  test('segmented route has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/components/Segmented');
  });

  test('cascade select route (opened state) has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(
      page,
      '/components/Cascade-Select',
      async (currentPage) => {
        const trigger = currentPage
          .locator('magary-cascade-select .magary-cascade-select')
          .first();
        await trigger.click();
        await expect(currentPage.locator('.select-panel:visible')).toHaveCount(1);
      },
    );
  });

  test('keyboard-only navigation covers panel, data and overlay flows', async ({
    page,
  }) => {
    await openRoute(page, '/components/tabview');

    const tabButtons = page.locator('magary-tabs .tab-headers button');
    await tabButtons.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabButtons.nth(1)).toHaveAttribute('aria-selected', 'true');

    await openRoute(page, '/components/Table');

    const nextPageButton = page.locator('.magary-paginator-next').first();
    await nextPageButton.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.magary-paginator-page-active').first()).toHaveText(
      '2',
    );

    await openRoute(page, '/components/Dialog');

    const dialogTrigger = page
      .getByRole('button', { name: 'Show Basic Dialog' })
      .first();
    await dialogTrigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.magary-dialog[role="dialog"]:visible')).toHaveCount(
      1,
    );

    await page.keyboard.press('Escape');
    await expect(page.locator('.magary-dialog[role="dialog"]:visible')).toHaveCount(
      0,
    );
  });

  test('focus indicators are visible and consistent on key controls', async ({
    page,
  }) => {
    await openRoute(page, '/components/Input');
    await expectVisibleFocusIndicator(page.getByLabel(/Nombre|Name/i).first());
    await expectVisibleFocusIndicator(page.getByLabel('Error').first());

    await openRoute(page, '/components/tabview');
    await expectVisibleFocusIndicator(
      page.locator('magary-tabs .tab-headers button').first(),
    );

    await openRoute(page, '/components/Table');
    await expectVisibleFocusIndicator(page.locator('.magary-paginator-next').first());
  });

  test('aria semantics and contrast are verified on critical controls', async ({
    page,
  }) => {
    await openRoute(page, '/components/Input');

    const errorInput = page.getByLabel('Error').first();
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');

    const describedBy = await errorInput.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toContainText(
      /Mensaje de error|Error message/i,
    );

    await expectMinimumContrast(page.locator('.header h1').first(), 4.5);
    await expectMinimumContrast(errorInput, 4.5);

    await openRoute(page, '/components/OverlayPanel');

    const trigger = page.getByRole('button', { name: 'Toggle Overlay' }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.magary-overlaypanel[role="dialog"]:visible')).toHaveCount(1);

    await page.keyboard.press('Escape');
    await expect(page.locator('.magary-overlaypanel[role="dialog"]:visible')).toHaveCount(0);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('premium themes gallery has no serious/critical a11y violations', async ({
    page,
  }) => {
    await expectNoSeriousA11yIssues(page, '/premium/themes');
  });
});
