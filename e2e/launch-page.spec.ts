import { test, expect } from '@playwright/test';

test.describe('Launch Page E2E Tests', () => {
  test('should render the pre-launch page with logo and Coming Soon message', async ({ page }) => {
    await page.goto('/');

    // Check main container
    const main = page.locator('main.launch-page-container');
    await expect(main).toBeVisible();

    // Check central logo
    const logo = page.getByRole('img', { name: 'Chorley Wildcats' });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveClass(/launch-logo/);

    // Check Coming Soon heading
    const heading = page.getByRole('heading', { name: 'Coming Soon', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should not render navigation bar or footer, preventing navigation', async ({ page }) => {
    await page.goto('/');

    // Ensure navigation elements do not exist
    await expect(page.locator('nav')).toHaveCount(0);
    await expect(page.locator('.main-header')).toHaveCount(0);
    await expect(page.locator('.main-navigation')).toHaveCount(0);

    // Ensure footer does not exist
    await expect(page.locator('footer')).toHaveCount(0);
    await expect(page.locator('.main-footer')).toHaveCount(0);
  });
});

