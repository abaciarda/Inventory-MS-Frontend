import { Page, expect } from '@playwright/test';

export async function loginAsAdmin(page: Page) {
  const username = process.env.E2E_USERNAME || 'admin';
  const password = process.env.E2E_PASSWORD || 'password123';
  
  await page.goto('/');
  
  // Fill in the login form
  await page.getByTestId('login-username-input').fill(username);
  await page.getByTestId('login-password-input').fill(password);
  
  // Submit the form
  await page.getByTestId('login-submit-button').click();
  
  // Wait for the navigation to dashboard
  await expect(page).toHaveURL(/.*\/dashboard/);
}
