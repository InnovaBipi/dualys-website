import { test, expect } from '@playwright/test';

/**
 * Services & Sectors Deep Dive — Updated per Briefing v2.0
 * (Replaces old "Capability Deep Dive")
 *
 * Path: / → /servicios → /sectores → /contact
 * Priority: Critical
 */

test.describe('Services & Sectors Journey', () => {
  test('homepage → servicios → contact', async ({ page }) => {
    await page.goto('/es');

    await page.goto('/es/servicios');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=/FFD|Programa|programa/i')).toBeVisible();

    const contactLink = page.locator('a[href*="contact"]').first();
    await expect(contactLink).toBeVisible();
  });

  test('homepage → sectores → explore verticals', async ({ page }) => {
    await page.goto('/es/sectores');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toContainText(/naval|aeronáutica|ciberdefensa/i);
    await expect(page.locator('text=/dónde vienes|origen/i')).toBeVisible();
  });

  test('homepage → nosotros → trust building', async ({ page }) => {
    await page.goto('/es/nosotros');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=/DUALYS nace/i')).toBeVisible();
    await expect(page.locator('text=/institucional|estrategia|técnico|comercialización/i')).toBeVisible();
  });

  test('metodologia shows 3 phases + NDA', async ({ page }) => {
    await page.goto('/es/metodologia');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=/Diagnóstico/i')).toBeVisible();
    await expect(page.locator('text=/Posicionamiento/i')).toBeVisible();
    await expect(page.locator('text=/Activación/i')).toBeVisible();
    await expect(page.locator('text=/confidencialidad/i')).toBeVisible();
  });
});
