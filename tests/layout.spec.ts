import { test, expect } from '@playwright/test';

// Desktop: 1440x900, 1280x800
// Tablet: 1024x768, 768x1024
// Mobile: 390x844, 375x667, 412x915

const viewports = [
  { name: 'Desktop Large', width: 1440, height: 900 },
  { name: 'Desktop Normal', width: 1280, height: 800 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Mobile iPhone 12 Pro', width: 390, height: 844 },
  { name: 'Mobile iPhone SE', width: 375, height: 667 },
  { name: 'Mobile Pixel', width: 412, height: 915 },
];

for (const vp of viewports) {
  test.describe(`Responsive tests for ${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('Homepage loads, hero is visible, no horizontal overflow', async ({ page }) => {
      // Catch console errors and hydration errors
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('http://localhost:3000');

      // 1. Page Loads & No Errors
      expect(errors).not.toContain('Hydration failed');

      // 2. Header visible
      const header = page.locator('header').first();
      await expect(header).toBeVisible();

      // 3. Hero is visible
      const heroHeading = page.locator('h1').first();
      await expect(heroHeading).toBeVisible();
      const heroBox = await heroHeading.boundingBox();
      expect(heroBox).not.toBeNull();
      expect(heroBox!.width).toBeGreaterThan(0);
      expect(heroBox!.height).toBeGreaterThan(0);

      // 4. The Frontier reveal completes at every breakpoint.
      const frontierCopy = page.locator('#frontier p').first();
      await frontierCopy.scrollIntoViewIfNeeded();
      await expect(frontierCopy).toBeVisible();
      await expect(frontierCopy).toHaveCSS('opacity', '1');

      // 5. No horizontal overflow
      const maxScrollX = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(maxScrollX).toBeLessThanOrEqual(0); // 0 or negative means no scroll
    });

    test('Navigation works', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // The rebuilt menu control is intentionally available at every width.
      // Find the hamburger button by aria-controls which remains constant.
      const hamburger = page.locator('button[aria-controls="mobile-nav-menu"]').first();
      await expect(hamburger).toBeVisible();

      // 1. Click to open (wait briefly for React hydration)
      await page.waitForTimeout(1000);
      await hamburger.click();
        
      // 2. Menu becomes visible.
      const mobileMenu = page.locator('#mobile-nav-menu').first();
      await expect(mobileMenu).toHaveClass(/opacity-100/);

      // 3. Body scroll locks
      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

      // 4. Click to close
      await hamburger.click();
        
      // Wait for transition
      await page.waitForTimeout(500);
        
      // 5. Body scroll unlocks
      await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');

      // 6. Menu links navigate and release the page lock.
      await hamburger.click();
      await mobileMenu.getByRole('link', { name: 'Company' }).click();
      await expect(page).toHaveURL(/\/company$/);
      await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
    });

    test('Research page hero visibility', async ({ page }) => {
      await page.goto('http://localhost:3000/research');
      const researchHero = page.locator('h1').first();
      await expect(researchHero).toBeVisible();
      const box = await researchHero.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    });

    test('Lab page hero visibility', async ({ page }) => {
      await page.goto('http://localhost:3000/lab');
      const labHero = page.locator('h1').first();
      await expect(labHero).toBeVisible();
      const box = await labHero.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    });
  });
}
