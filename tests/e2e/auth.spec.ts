import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Authentication', () => {
  test('User can login and is redirected to dashboard', async ({ page }) => {
    await test.step('Given a user is on the login page', async () => {
      await page.goto('/');
      await expect(page.getByTestId('login-username-input')).toBeVisible();
    });

    await test.step('When they enter valid credentials', async () => {
      await loginAsAdmin(page);
    });

    await test.step('Then they should be authenticated and see the dashboard', async () => {
      await expect(page).toHaveURL(/.*\/dashboard/);
    });
  });

  test('User can logout', async ({ page }) => {
    await test.step('Given an authenticated user', async () => {
      await loginAsAdmin(page);
    });

    await test.step('When they click the logout button', async () => {
      await page.getByTestId('user-menu-button').click();
      await page.getByTestId('logout-button').click();
    });

    await test.step('Then they should be redirected to the login page', async () => {
      await expect(page).toHaveURL(/.*(?:$|\/)/);
      await expect(page.getByTestId('login-username-input')).toBeVisible();
    });
  });
});
