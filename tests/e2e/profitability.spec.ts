import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Profitability', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/analytics/profitability');
  });

  test('User can view profitability metrics', async ({ page }) => {
    await test.step('Given the user is on the profitability page', async () => {
      await expect(page).toHaveURL(/.*\/analytics\/profitability/);
    });

    await test.step('Then they should see the profitability summary', async () => {
      await expect(page.getByRole('heading', { name: 'Profitability' })).toBeVisible();
      
      // Verify stat cards are visible
      await expect(page.getByTestId('total-cost-value-card')).toBeVisible();
      await expect(page.getByTestId('total-retail-value-card')).toBeVisible();
      await expect(page.getByTestId('potential-profit-card')).toBeVisible();
      await expect(page.getByTestId('average-margin-card')).toBeVisible();
    });

    await test.step('And they should see the category and top products charts', async () => {
      await expect(page.getByText('Profitability by Category')).toBeVisible();
      await expect(page.getByText('Top Profitable Products')).toBeVisible();
    });
  });
});
