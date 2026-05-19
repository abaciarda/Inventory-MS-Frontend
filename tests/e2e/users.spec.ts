import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/users');
  });

  test('User can view the list of users', async ({ page }) => {
    await test.step('Given the user is on the users page', async () => {
      await expect(page).toHaveURL(/.*\/users/);
    });

    await test.step('Then they should see a list of users', async () => {
      await expect(page.getByRole('heading', { name: /Users/i })).toBeVisible();
      // Ensure the table has at least one user row
      const userRows = page.getByTestId('user-row');
      await expect(userRows.first()).toBeVisible();
    });
  });

  test('User can create a new user', async ({ page }) => {
    const timestamp = Date.now();
    const newUsername = `testuser_${timestamp}`;
    
    await test.step('Given the user opens the create user form', async () => {
      await page.getByTestId('create-user-button').click();
      await expect(page.getByRole('heading', { name: /Create User/i })).toBeVisible();
    });

    await test.step('When they fill out and submit the form', async () => {
      await page.getByTestId('create-username-input').fill(newUsername);
      await page.getByTestId('create-password-input').fill('SecurePass123!');
      
      // Select role SME_STAFF
      await page.getByTestId('create-role-select').click();
      await page.getByRole('option', { name: 'SME_STAFF' }).click();

      await page.getByTestId('create-submit-button').click();
    });

    await test.step('Then the new user should appear in the table', async () => {
      await expect(page.getByText('User created.')).toBeVisible();
      await expect(page.getByRole('cell', { name: newUsername })).toBeVisible();
    });
  });

  test('User can edit an existing user', async ({ page }) => {
    await test.step('Given there is an existing user', async () => {
      const userRows = page.getByTestId('user-row');
      await expect(userRows.first()).toBeVisible();
    });

    await test.step('When the user edits the first user in the list', async () => {
      const firstRow = page.getByTestId('user-row').first();
      await firstRow.getByTestId('user-actions-button').click();
      await page.getByTestId('user-edit-button').click();
      
      await expect(page.getByRole('heading', { name: /Edit user/i })).toBeVisible();

      // Change role to SME_OWNER
      await page.getByTestId('edit-role-select').click();
      await page.getByRole('option', { name: 'SME_OWNER' }).click();

      await page.getByTestId('edit-submit-button').click();
    });

    await test.step('Then the user details should be updated', async () => {
      await expect(page.getByText('User edited.')).toBeVisible();
    });
  });
});
