<script>
	import { persist } from '$lib';
</script>

<form
	id="my-form"
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

	<button type="submit">Save</button>
</form>
