import { expect, test } from '@playwright/test';

test('the form in the root route "/" should be saved in localSorage and persisted on refresh', async ({ page }) => {
	const form = {
		title: 'Test Title',
		content: 'Test Content',
		date: '2021-01-01',
		phone: '1234567890',
		email: 'johndoe@example.com',
		url: 'https://example.com',
		number: '123',
		range: '50',
		color: '#ff0000',
		checkbox: 'on',
		radio: 'option2',
		password: 'password',
	} as const;

	await page.goto('/');

	expect(page.getByTestId('my-form')).toBeTruthy();

	await page.getByTestId('email').fill(form.email);
	await page.getByTestId('title').fill(form.title);
	await page.getByTestId('content').fill(form.content);
	await page.getByTestId('date').fill(form.date);
	await page.getByTestId('phone').fill(form.phone);
	await page.getByTestId('url').fill(form.url);
	await page.getByTestId('number').fill(form.number);
	await page.getByTestId('range').fill(form.range);
	await page.getByTestId('color').fill(form.color);
	await page.getByTestId('checkbox').check();
	await page.getByTestId('radio-option2').check();
	await page.getByTestId('password').fill(form.password);

	const _localStorage: Record<string, any> = await page.evaluate(() => {
		return localStorage
	});

	expect(_localStorage['form-test']).toBeTruthy();

	const saved_form = JSON.parse(_localStorage['form-test']);

	expect(saved_form['password']).toBeUndefined();

	expect(saved_form).toEqual({
		...form,
		password: undefined,
	});

	await page.reload();

	await expect(await page.getByTestId('email').inputValue()).toStrictEqual(form.email);
	await expect(await page.getByTestId('title').inputValue()).toStrictEqual(form.title);
	await expect(await page.getByTestId('content').inputValue()).toStrictEqual(form.content);
	await expect(await page.getByTestId('date').inputValue()).toStrictEqual(form.date);
	await expect(await page.getByTestId('phone').inputValue()).toStrictEqual(form.phone);
	await expect(await page.getByTestId('url').inputValue()).toStrictEqual(form.url);
	await expect(await page.getByTestId('number').inputValue()).toStrictEqual(form.number);
	await expect(await page.getByTestId('range').inputValue()).toStrictEqual(form.range);
	await expect(await page.getByTestId('color').inputValue()).toStrictEqual(form.color);
	await expect(await page.getByTestId('checkbox').isChecked()).toEqual(true);
	await expect(await page.getByTestId('radio-option2').isChecked()).toEqual(true);
	await expect(await page.getByTestId('password').inputValue()).toEqual("");


});
