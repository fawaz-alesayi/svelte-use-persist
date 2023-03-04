import { expect, test } from '@playwright/test';

test('the form in the root route "/" should be saved in localSorage', async ({ page }) => {
	const form = {
		email: 'johndoe@example.com',
		title: 'Test Title',
		content: 'Test Content',
		date: '2021-01-01',
		phone: '1234567890',
	} as const;

	await page.goto('/');

	expect(await page.$('form')).toBeTruthy();

	await page.getByTestId('email').fill(form.email);
	await page.getByTestId('title').fill(form.title);
	await page.getByTestId('content').fill(form.content);
	await page.getByTestId('date').fill(form.date);
	await page.getByTestId('phone').fill(form.phone);

	const _localStorage: Record<string, any> = await page.evaluate(() => {
		return localStorage
	});

	expect(_localStorage['form-test']).toBeTruthy();

	const saved_form = JSON.parse(_localStorage['form-test']);

	expect(saved_form).toEqual(form);
});
