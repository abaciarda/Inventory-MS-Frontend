import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Product Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/products');
  });

  test('User can view the list of products', async ({ page }) => {
    await test.step('Given the user is on the products page', async () => {
      await expect(page).toHaveURL(/.*\/products/);
    });

    await test.step('Then they should see a list of products', async () => {
      await expect(page.getByRole('heading', { name: /Products/i })).toBeVisible();
      await expect(page.locator('table')).toBeVisible();
    });
  });

  test('User can create a new product', async ({ page }) => {
    const timestamp = Date.now();
    const newProductName = `Test Product ${timestamp}`;
    const newProductSku = `SKU-${timestamp}`;
    
    await test.step('Given the user clicks Add Product', async () => {
      await page.getByTestId('add-product-button').click();
      await expect(page).toHaveURL(/.*\/products\/new/);
    });

    await test.step('When they fill out and submit the form', async () => {
      await page.getByTestId('create-product-name-input').fill(newProductName);
      await page.getByTestId('create-product-sku-input').fill(newProductSku);
      
      // Select the first available category
      await page.getByTestId('create-product-category-select').click();
      await page.locator('[role="option"]').first().click();

      await page.getByTestId('create-product-cost-input').fill('10.00');
      await page.getByTestId('create-product-sales-input').fill('20.00');
      await page.getByTestId('create-product-stock-input').fill('100');

      await page.getByTestId('create-product-submit').click();
    });

    await test.step('Then the new product should appear in the table', async () => {
      await expect(page.getByText('Product created.')).toBeVisible();
      await page.goto('/products');
      await page.getByTestId('products-search-input').fill(newProductName);
      await expect(page.getByRole("row", { name: new RegExp(newProductName) })).toBeVisible();
    });
  });

  test('User can edit an existing product', async ({ page }) => {
    const editTimestamp = Date.now();
    const updatedProductName = `Updated Product ${editTimestamp}`;

    await test.step('Given there is an existing product', async () => {
      const firstRowActions = page.getByTestId('product-actions-button').first();
      await firstRowActions.click();
    });

    await test.step('When the user edits the product', async () => {
      await page.getByTestId('product-edit-link').click();
      await expect(page).toHaveURL(/.*\/products\/\d+\/edit/);

      await page.getByTestId('edit-product-name-input').fill(updatedProductName);
      await page.getByTestId('edit-product-submit').click();
    });

    await test.step('Then the product details should be updated', async () => {
      await expect(page.getByText('Product updated.')).toBeVisible();
      await page.goto('/products');
      await page.getByTestId('products-search-input').fill(updatedProductName);
      await expect(page.getByRole("row", { name: new RegExp(updatedProductName) })).toBeVisible();
    });
  });

  test('User can delete a product', async ({ page }) => {
    let productNameToDelete = '';

    await test.step('Given there is an existing product', async () => {
      productNameToDelete = `E2E Delete Product ${Date.now()}`;
      await page.goto('/products/new');
      await page.getByTestId('create-product-name-input').fill(productNameToDelete);
      await page.getByTestId('create-product-sku-input').fill(`SKU-DEL-${Date.now()}`);
      await page.getByTestId('create-product-category-select').click();
      await page.locator('[role="option"]').first().click();
      await page.getByTestId('create-product-cost-input').fill('10.00');
      await page.getByTestId('create-product-sales-input').fill('20.00');
      await page.getByTestId('create-product-stock-input').fill('0');
      await page.getByTestId('create-product-submit').click();

      await expect(page.getByText('Product created.')).toBeVisible();
      await page.goto('/products');

      // Search for the product to bypass pagination
      await page.getByTestId('products-search-input').fill(productNameToDelete);
      await expect(page.getByRole("row", { name: new RegExp(productNameToDelete) })).toBeVisible();

      const row = page.getByRole("row", { name: new RegExp(productNameToDelete) });
      const rowActions = row.getByTestId('product-actions-button');
      await rowActions.click();
    });

    await test.step('When the user clicks delete on a product', async () => {
      await page.getByRole("menuitem", { name: /Delete product/i }).click();
    });

    await test.step('Then the product should be removed', async () => {
      await expect(page.getByText('Product deleted successfully')).toBeVisible();
      await page.reload();
      
      // Search again to ensure it's removed across all pages
      await page.getByTestId('products-search-input').fill(productNameToDelete);
      await expect(page.getByRole("row", { name: new RegExp(productNameToDelete) })).not.toBeVisible();
    });
  });
});
