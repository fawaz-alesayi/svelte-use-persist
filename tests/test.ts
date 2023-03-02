import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');

	// assert that the page has a form
	expect(await page.$('form')).toBeTruthy();

	// assert that the form has an input
	expect(await page.$('form input')).toBeTruthy();
});
