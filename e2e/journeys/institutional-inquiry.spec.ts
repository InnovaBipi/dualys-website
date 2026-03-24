import { test, expect } from '@playwright/test';

/**
 * Institutional / Industrial Inquiry Journey — Updated per Briefing v2.0
 *
 * Path: / → /sectores → /contact
 * Priority: High
 * Target: Industrial companies exploring defense entry
 */

test.describe('Industrial Inquiry Journey', () => {
  test('audience card → sectores → contact', async ({ page }) => {
    await page.goto('/es');

    // Homepage should have audience section
    await expect(page.locator('text=/Para quién|industriales|tecnología/i')).toBeVisible();

    // Navigate to sectores
    await page.goto('/es/sectores');
    await expect(page.locator('h1')).toBeVisible();

    // Navigate to contact
    await page.goto('/es/contact');
    await expect(page.locator('form')).toBeVisible();

    // Sector dropdown should exist
    await expect(page.locator('select, [name="sector"]')).toBeVisible();
  });

  test('contact form has required fields', async ({ page }) => {
    await page.goto('/es/contact');

    // New form fields per briefing
    await expect(page.locator('[name="name"], input[type="text"]').first()).toBeVisible();
    await expect(page.locator('[name="email"], input[type="email"]')).toBeVisible();
    await expect(page.locator('select, [name="sector"]')).toBeVisible();
    await expect(page.locator('textarea, [name="challenge"]')).toBeVisible();

    // RGPD checkbox
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();

    // Submit button with briefing CTA
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
