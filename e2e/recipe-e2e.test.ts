import { test, expect } from '@playwright/test';

test('Filter Recipes by Tags', async ({ page }) => {
	await page.goto('/recipes');

	const recipeGrid = await page.locator('[data-testid="recipe-preview"]').count();
	expect(recipeGrid).toBe(12);

	const tagSelect = page.locator('#tag');
	tagSelect.selectOption('Cookies');

	await page.waitForTimeout(500);

	expect(await page.locator('[data-testid="recipe-preview"]').count()).toBe(1);
});

test('Add Recipe to list', async ({ page }) => {
	await page.goto('/grocery-list');

	await expect(page.locator('h2')).toBeVisible();

	await page.goto('/recipes');

	const tagSelect = page.locator('#tag');
	tagSelect.selectOption('Cookies');

	await page.waitForTimeout(500);

	await page.goto('/recipes/3');

	await page.waitForTimeout(8000);

	await page.locator('[data-testid="add-to-list"]').waitFor({ state: 'visible' });
	await page.locator('[data-testid="add-to-list"]').click();

	await page.goto('/grocery-list');

	await page.waitForTimeout(500);
	const item = await page.locator('[data-testid="grocery-item"]').count();
	expect(item).toBe(9);
});
