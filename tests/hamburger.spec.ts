import { test, expect } from '@playwright/test';

const viewports = [
  { width: 1024, height: 768, type: 'tablet' },
  { width: 768, height: 1024, type: 'tablet' },
  { width: 390, height: 844, type: 'mobile' },
  { width: 375, height: 667, type: 'mobile' },
  { width: 412, height: 915, type: 'mobile' }
];

for (const vp of viewports) {
  test(`Check mobile menu functionality at ${vp.width}x${vp.height}`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const hamburger = page.getByRole("button", { name: "Open menu" });
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    // Open Menu
    await hamburger.click();
    await expect(hamburger).toHaveAttribute("aria-expanded", "true");

    const menu = page.getByRole("dialog", { name: "Site navigation" });
    await expect(menu).toBeVisible();
    await expect(menu.getByText("RESEARCH & INSIGHTS")).toBeVisible();
    
    // Check Navigation
    await menu.getByText("LAB").click();
    await expect(page).toHaveURL(/\/lab/);
    
    // Menu should be closed after navigation
    await expect(menu).toBeHidden();
  });
}

const desktopViewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 800 }
];

for (const vp of desktopViewports) {
  test(`Check desktop menu at ${vp.width}x${vp.height}`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Desktop nav should be visible, hamburger hidden
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  });
}
