import { expect, test } from '@playwright/test';

test('forms with use:persist should save their inputs to local storage', async ({ page }) => {
	await page.goto('/');

	expect(await page.$('form')).toBeTruthy();

	const input = await page.$('input');
});
