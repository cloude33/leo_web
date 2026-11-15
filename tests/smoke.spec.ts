import { test, expect } from '@playwright/test';

test.describe('Leo Mimarlık Web Smoke Tests', () => {
  test('homepage renders hero and project archive', async ({ page }) => {
    await page.goto('/');

    // Check title / branding
    await expect(page).toHaveTitle(/LEO/i);

    // Hero section check
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Featured projects section check
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Footer check
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('navigation to subpages', async ({ page }) => {
    await page.goto('/hakkimizda');
    await expect(page.locator('h1')).toContainText(/Taşın Zamansızlığı/i);

    await page.goto('/hizmetler');
    await expect(page.locator('h1')).toContainText(/Hayalden Gerçeğe/i);

    await page.goto('/iletisim');
    await expect(page.locator('h1')).toContainText(/Yaşam Alanınızı/i);
  });
});
