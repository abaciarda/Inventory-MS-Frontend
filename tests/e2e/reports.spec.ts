import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Reports', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/analytics/reports');
  });

  test('User can view the list of reports', async ({ page }) => {
    await test.step('Given the user is on the reports page', async () => {
      await expect(page).toHaveURL(/.*\/analytics\/reports/);
    });

    await test.step('Then they should see the reports table', async () => {
      await expect(page.getByRole('heading', { name: /Reports/i })).toBeVisible();
      await expect(page.locator('table')).toBeVisible();
    });
  });

  test('User can generate a new report', async ({ page }) => {
    const timestamp = Date.now();
    const reportName = `Q1 Stock Report ${timestamp}`;
    
    await test.step('Given the user clicks Generate New Report', async () => {
      await page.getByTestId('generate-report-button').click();
      await expect(page.getByRole('heading', { name: /Generate New Report/i })).toBeVisible();
    });

    await test.step('When they fill out and submit the form', async () => {
      await page.getByTestId('generate-report-name-input').fill(reportName);
      
      await page.getByTestId('generate-report-format-select').click();
      await page.getByRole('option', { name: 'PDF' }).click();

      await page.getByTestId('generate-report-submit').click();
    });

    await test.step('Then the new report should be generated and visible', async () => {
      await expect(page.getByText('Report generated and saved.')).toBeVisible();
      await page.getByTestId('reports-search-input').fill(reportName);
      await expect(page.getByRole("row", { name: new RegExp(reportName) })).toBeVisible();
    });
  });

  test('User can download a stored report', async ({ page }) => {
    await test.step('Given there is an existing report', async () => {
      const downloadButton = page.getByTestId('download-report-button').first();
      await expect(downloadButton).toBeVisible();
    });

    await test.step('When the user clicks download', async () => {
      const downloadPromise = page.waitForEvent('download');
      await page.getByTestId('download-report-button').first().click();
      
      const download = await downloadPromise;
      // Wait for the download to complete
      await download.path();
    });

    await test.step('Then the download should be successful', async () => {
      await expect(page.getByText('Report downloaded')).toBeVisible();
    });
  });
});
