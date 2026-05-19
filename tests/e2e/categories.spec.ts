import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Category Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/categories');
  });

  test('User can view the list of categories', async ({ page }) => {
    await test.step('Given the user is on the categories page', async () => {
      await expect(page).toHaveURL(/.*\/categories/);
    });

    await test.step('Then they should see a list of categories', async () => {
      await expect(page.getByRole('heading', { name: /Categories/i })).toBeVisible();
      // Ensure there's a table with categories or empty state
      await expect(page.locator('table')).toBeVisible();
    });
  });

  test('User can create a new category', async ({ page }) => {
    const timestamp = Date.now();
    const newCategoryName = `Test Category ${timestamp}`;
    
    await test.step('Given the user clicks Add Category', async () => {
      await page.getByTestId('add-category-button').click();
      await expect(page).toHaveURL(/.*\/categories\/new/);
    });

    await test.step('When they fill out and submit the form', async () => {
      await page.getByTestId('create-category-name-input').fill(newCategoryName);
      await page.getByTestId('create-category-description-input').fill('Created by E2E test');
      await page.getByTestId('create-category-submit').click();
    });

    await test.step('Then the new category should appear in the table', async () => {
      await expect(page.getByText('Category created.')).toBeVisible();
      
      // Navigate manually to /categories
      await page.goto('/categories');
      
      await page.getByTestId('categories-search-input').fill(newCategoryName);
      await expect(page.getByRole("row", { name: new RegExp(newCategoryName) })).toBeVisible();
    });
  });

  test('User can edit an existing category', async ({ page }) => {
    const editTimestamp = Date.now();
    const updatedCategoryName = `Updated Category ${editTimestamp}`;

    await test.step('Given there is an existing category', async () => {
      const firstRowActions = page.getByTestId('category-actions-button').first();
      await firstRowActions.click();
    });

    await test.step('When the user edits the category', async () => {
      await page.getByTestId('category-edit-link').click();
      await expect(page).toHaveURL(/.*\/categories\/\d+\/edit/);

      await page.getByTestId('edit-category-name-input').fill(updatedCategoryName);
      await page.getByTestId('edit-category-submit').click();
    });

    await test.step('Then the category details should be updated', async () => {
      await expect(page.getByText('Category updated.')).toBeVisible();
      await page.goto('/categories');
      await page.getByTestId('categories-search-input').fill(updatedCategoryName);
      await expect(page.getByRole("row", { name: new RegExp(updatedCategoryName) })).toBeVisible();
    });
  });

  test('User can delete a category', async ({ page }) => {
    let categoryNameToDelete = '';

    await test.step('Given there is an existing category', async () => {
      // Create a unique category to delete
      categoryNameToDelete = `E2E Delete Category ${Date.now()}`;
      await page.goto('/categories/new');
      await page.getByTestId('create-category-name-input').fill(categoryNameToDelete);
      await page.getByTestId('create-category-description-input').fill('To be deleted');
      await page.getByTestId('create-category-submit').click();
      
      await expect(page.getByText('Category created.')).toBeVisible();
      await page.goto('/categories');
      await page.getByTestId('categories-search-input').fill(categoryNameToDelete);
      await expect(page.getByRole("row", { name: new RegExp(categoryNameToDelete) })).toBeVisible();
      
      const row = page.getByRole("row", { name: new RegExp(categoryNameToDelete) });
      const rowActions = row.getByTestId('category-actions-button');
      await rowActions.click();
    });

    await test.step('When the user clicks delete on a category', async () => {
      await page.getByRole("menuitem", { name: /Delete category/i }).click();
    });

    await test.step('Then the category should be removed', async () => {
      await expect(page.getByText('Category deleted successfully')).toBeVisible();
      await page.reload();
      await page.getByTestId('categories-search-input').fill(categoryNameToDelete);
      await expect(page.getByRole("row", { name: new RegExp(categoryNameToDelete) })).not.toBeVisible();
    });
  });
});
