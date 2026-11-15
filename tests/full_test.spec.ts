import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Leo Mimarlık E2E & Visual Verification', () => {
  const screenshotsDir = path.join(__dirname, '..', 'test-screenshots');

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test('full interactive inspection of homepage, hero, filters, modal and subpages', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Visit Homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/LEO/i);

    // Screenshot initial hero
    await page.screenshot({ path: path.join(screenshotsDir, '01_homepage_hero.png') });

    // 2. Test Hero Slider Interaction
    const nextBtn = page.locator('#hero button[aria-label="Next Slide"]');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await page.waitForTimeout(600); // Wait for transition

    // Verify slide index progressed
    const slideIndicator = page.locator('#hero').getByText('02 / 03');
    await expect(slideIndicator).toBeVisible();
    await page.screenshot({ path: path.join(screenshotsDir, '02_hero_slide_2.png') });

    // 3. Test ProjectModal Interaction on Featured Card
    const featuredCard = page.getByTestId('featured-card-3');
    await featuredCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    // Click card
    await featuredCard.click();

    // Verify modal appeared with Back button
    const backBtn = page.getByRole('button', { name: /Projeler'e Dön|Back to Projects/i });
    await expect(backBtn).toBeVisible({ timeout: 6000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, '03_project_modal_open.png') });

    // Close modal via Back button
    await backBtn.click();
    await page.waitForTimeout(400);
    await expect(backBtn).not.toBeVisible();

    // 4. Scroll to Projects & Test Filter Pills
    const allProjectsSection = page.locator('#all-projects');
    await allProjectsSection.scrollIntoViewIfNeeded();

    // Test URLA Filter
    const urlaBtn = allProjectsSection.getByRole('button', { name: /URLA \(/i });
    await urlaBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, '04_projects_urla_filter.png') });

    // Test ACARKENT Filter
    const acarkentBtn = allProjectsSection.getByRole('button', { name: /ACARKENT \(/i });
    await acarkentBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, '05_projects_acarkent_filter.png') });

    // Reset to ALL Filter
    const allBtn = allProjectsSection.getByRole('button', { name: /TÜMÜ \(/i });
    await allBtn.click();
    await page.waitForTimeout(400);

    // 5. Navigate to /hakkimizda
    await page.goto('/hakkimizda');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, '06_hakkimizda_page.png') });
    await expect(page.locator('h1')).toBeVisible();

    // 6. Navigate to /hizmetler
    await page.goto('/hizmetler');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, '07_hizmetler_page.png') });
    await expect(page.locator('h1')).toBeVisible();

    // 7. Navigate to /iletisim
    await page.goto('/iletisim');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, '08_iletisim_page.png') });
    await expect(page.locator('h1')).toBeVisible();

    console.log(`Test completed with ${consoleErrors.length} console errors.`);
  });
});
