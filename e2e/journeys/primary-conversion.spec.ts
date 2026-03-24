import { test, expect } from '@playwright/test';

/**
 * Primary Conversion Journey — Updated per Briefing v2.0
 *
 * Path: / → /contact (via CTA "Solicita tu diagnóstico")
 * Priority: Critical
 * Expected clicks: 1
 */

test.describe('Primary Conversion Journey', () => {
  test('homepage → contact via primary CTA', async ({ page }) => {
    await page.goto('/es');

    // Verify hero with briefing copy
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/empresa.*defensa|defense.*needs/i);

    // Verify primary CTA exists and links to contact
    const primaryCTA = page.locator('a[href*="contact"]').first();
    await expect(primaryCTA).toBeVisible();

    // Click primary CTA
    await primaryCTA.click();
    await expect(page).toHaveURL(/\/es\/contact/);

    // Verify contact form with new fields
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('select, [name="sector"]')).toBeVisible();

    // Verify address
    await expect(page.locator('text=/Sant Cugat/i')).toBeVisible();
  });

  test('homepage → metodologia via secondary CTA', async ({ page }) => {
    await page.goto('/es');

    const methodologyCTA = page.locator('a[href*="metodologia"]').first();
    await expect(methodologyCTA).toBeVisible();

    await methodologyCTA.click();
    await expect(page).toHaveURL(/\/es\/metodologia/);

    // Verify methodology page has FFD program
    await expect(page.locator('text=/FFD|FIT FOR DEFENSE/i')).toBeVisible();
  });

  test('has accessible navigation on each step', async ({ page }) => {
    await page.goto('/es');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('loads within performance thresholds', async ({ page }) => {
    await page.goto('/es');
    const startTime = Date.now();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });
});

test.describe('Primary Conversion - Multi-language', () => {
  const locales = ['en', 'es', 'fr', 'ca'];

  for (const locale of locales) {
    test(`works in ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator('h1')).toBeVisible();

      await page.goto(`/${locale}/servicios`);
      await expect(page.locator('main')).toBeVisible();

      await page.goto(`/${locale}/contact`);
      await expect(page.locator('form')).toBeVisible();
    });
  }
});
