import { expect, test } from '@playwright/test';

test('the form in the root route "/" should be persisted in localSorage', async ({ page }) => {
	const input_value = 'My Title';
	await page.goto('/');

	expect(await page.$('#test')).toBeTruthy();

	await page.fill('input[type="text"]', input_value);
	await page.fill('input[type="password"]', 'My Password');

	const _localStorage = await page.evaluate(() => {
		return localStorage.getItem('test');
	});

	expect(_localStorage).toContain(input_value);
});
