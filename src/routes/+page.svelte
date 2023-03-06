<script>
	import { persist } from '$lib';
</script>

<form
	id="my-form"
	data-testid="my-form"
	use:persist={{
		key: 'form-test'
	}}
>
	<label for="title">Title</label>
	<input type="text" name="title" data-testid="title" />

	<label for="content">Content</label>
	<textarea name="content" data-testid="content" />

	<label for="date">Date</label>
	<input type="date" name="date" data-testid="date" />

	<label for="phone">Phone</label>
	<input type="tel" name="phone" data-testid="phone" />

	<label for="email">Email</label>
	<input type="email" name="email" data-testid="email" />

	<label for="url">URL</label>
	<input type="url" name="url" data-testid="url" />

	<label for="number">Number</label>
	<input type="number" name="number" data-testid="number" />

	<label for="range">Range</label>
	<input type="range" name="range" data-testid="range" />

	<label for="color">Color</label>
	<input type="color" name="color" data-testid="color" />

	<label for="checkbox">Checkbox</label>
	<input type="checkbox" name="checkbox" data-testid="checkbox" value="on" />

	<label for="radio">Radio</label>
	<input type="radio" name="radio" data-testid="radio" value="on" />
</form>

<input use:persist={{
	key: 'discrete',
}} type="text" name="discrete" data-testid="discrete" />

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		row-gap: 1rem;
	}
</style>