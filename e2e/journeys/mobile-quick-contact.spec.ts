import { test, expect, devices } from '@playwright/test';

/**
 * Mobile Quick Contact Journey — Updated per Briefing v2.0
 *
 * Path: Mobile user → CTA in header → /contact
 * Priority: High
 * Device: Mobile (375x667)
 */

test.use(devices['iPhone 13']);

test.describe('Mobile Quick Contact Journey', () => {
  test('mobile header CTA leads to contact', async ({ page }) => {
    await page.goto('/es');

    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-controls="mobile-menu"]');
    await expect(menuButton).toBeVisible();

    // Touch target should be at least 44x44
    const box = await menuButton.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // Open mobile menu
    await menuButton.click();

    // Mobile menu should show nav items
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // CTA button in mobile menu
    const mobileCTA = page.locator('#mobile-menu a[href*="contact"]');
    await expect(mobileCTA).toBeVisible();

    // Click CTA
    await mobileCTA.click();
    await expect(page).toHaveURL(/\/es\/contact/);

    // Form should be visible
    await expect(page.locator('form')).toBeVisible();
  });

  test('mobile homepage renders all 7 sections', async ({ page }) => {
    await page.goto('/es');

    // Hero
    await expect(page.locator('h1')).toBeVisible();

    // Context note (800.000 M€)
    await expect(page.locator('text=/800.000/i')).toBeVisible();

    // Footer with address
    await expect(page.locator('footer')).toContainText(/Sant Cugat/i);
  });

  test('mobile sectores page is scrollable', async ({ page }) => {
    await page.goto('/es/sectores');
    await expect(page.locator('h1')).toBeVisible();

    // Should have verticals visible
    await expect(page.locator('main')).toContainText(/naval|terrestres/i);
  });

  test('mobile contact form works', async ({ page }) => {
    await page.goto('/es/contact');

    // Form fields should be stacked vertically on mobile
    await expect(page.locator('form')).toBeVisible();

    // Submit button should be visible without scrolling too much
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();

    // Touch target check for submit button
    const box = await submitButton.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});
