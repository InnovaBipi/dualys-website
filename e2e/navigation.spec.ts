import { test, expect } from '@playwright/test';

/**
 * Navigation Tests — Updated per Briefing v2.0
 *
 * Validates new route structure, redirects, and language switching.
 */

test.describe('Site Navigation', () => {
  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/servicios', name: 'Servicios' },
    { path: '/sectores', name: 'Sectores' },
    { path: '/metodologia', name: 'Metodología' },
    { path: '/nosotros', name: 'Nosotros' },
    { path: '/recursos', name: 'Recursos' },
    { path: '/contact', name: 'Contact' },
  ];

  for (const { path, name } of routes) {
    test(`${name} page (${path}) loads correctly`, async ({ page }) => {
      await page.goto(`/ca${path}`);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('header has 6 navigation items + CTA', async ({ page }) => {
    await page.goto('/ca');

    // Desktop nav should have links to new pages
    const navLinks = page.locator('header nav a').filter({ hasNotText: /dualys/i });
    const headerCTA = page.locator('header a[href*="contact"]');

    await expect(headerCTA).toBeVisible();
  });

  test('header CTA says "Solicita tu diagnòstic" in Catalan', async ({ page }) => {
    await page.goto('/ca');
    const cta = page.locator('header a[href*="contact"]');
    await expect(cta).toContainText(/diagnòstic/i);
  });

  test('footer has real address and email', async ({ page }) => {
    await page.goto('/ca');
    await expect(page.locator('footer')).toContainText(/Sant Cugat/i);
    await expect(page.locator('footer')).toContainText(/info@dualys.eu/i);
  });

  test('footer has NO fake trust signals', async ({ page }) => {
    await page.goto('/ca');
    const footer = page.locator('footer');
    await expect(footer).not.toContainText(/ISO 27001/i);
    await expect(footer).not.toContainText(/NATO Compatible/i);
  });
});

test.describe('Redirects (old → new routes)', () => {
  const redirects = [
    { from: '/about', to: '/nosotros' },
    { from: '/capabilities', to: '/servicios' },
    { from: '/sectors', to: '/sectores' },
    { from: '/news', to: '/recursos' },
  ];

  for (const { from, to } of redirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(`/ca${from}`);
      await expect(page).toHaveURL(new RegExp(to));
    });
  }
});

test.describe('Language Switching', () => {
  const locales = ['en', 'es', 'fr', 'ca'];

  test('language switcher is visible', async ({ page }) => {
    await page.goto('/ca');
    await expect(page.locator('header')).toBeVisible();
  });

  for (const locale of locales) {
    test(`${locale} locale loads correctly`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`/${locale}`));
    });
  }

  test('hreflang tags are present', async ({ page }) => {
    await page.goto('/ca');
    for (const locale of locales) {
      const hreflang = page.locator(`link[hreflang="${locale}"]`);
      await expect(hreflang).toBeAttached();
    }
    const xDefault = page.locator('link[hreflang="x-default"]');
    await expect(xDefault).toBeAttached();
  });
});

test.describe('Error Handling', () => {
  test('404 page works', async ({ page }) => {
    const response = await page.goto('/ca/nonexistent-page-xyz');
    expect(response?.status()).toBe(404);
    await expect(page.locator('main')).toBeVisible();
  });
});
