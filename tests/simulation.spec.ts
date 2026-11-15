import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('3D Villa Construction Simulation (Hardcore-Info)', () => {
  test('loads simulation page, renders 3D line-art canvas, and tests interactive controls', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Visit simulation page
    await page.goto('/insaat-simulasyonu');
    await page.waitForLoadState('networkidle');

    // Verify Title & Header
    await expect(page.locator('h1')).toContainText(/Urla Gaia/i);

    // 2. Verify 3D Canvas
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Wait for 3D scene initialization and first frames
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(__dirname, '..', 'test-screenshots', '10_simulation_initial.png') });

    // 3. Test jumping to Stage 2 (Taş Duvar)
    const stage2Btn = page.getByRole('button', { name: /02\. Masif Taş Duvar/i });
    await stage2Btn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(__dirname, '..', 'test-screenshots', '11_simulation_stage_2.png') });

    // 4. Test jumping to Stage 5 (Kesit & Tamamlanma)
    const stage5Btn = page.getByRole('button', { name: /05\. Kesit/i });
    await stage5Btn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(__dirname, '..', 'test-screenshots', '12_simulation_cutaway.png') });

    // 5. Test Cutaway toggle button
    const cutBtn = page.getByRole('button', { name: /Kesit/i }).last();
    await cutBtn.click();
    await page.waitForTimeout(400);

    // 6. Test Video Kaydet button exists
    const recordBtn = page.getByRole('button', { name: /Video Kaydet/i });
    await expect(recordBtn).toBeVisible();

    // 7. Verify console errors
    console.log(`Simulation test completed with ${consoleErrors.length} console errors.`);
    expect(consoleErrors.length).toBe(0);
  });
});
