<script>
	import { persist } from '$lib';
</script>

<main class="prose lg:prose-xl mb-4">
	<h1>svelte-use-persist demo</h1>

	<p>
		svelte-use-persist is a Svelte action that persists form values or individual inputs to
		localStorage.
	</p>

	<p>Fill out any of the fields below and refresh the page. Their values will be restored!</p>
</main>

<form
	class="flex flex-col items-start max-w-4xl border-4 border-black p-4 gap-4"
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

	<label for="select">Select</label>
	<select name="select" data-testid="select">
		<option value="1">One</option>
		<option value="2">Two</option>
		<option value="3">Three</option>
	</select>

	<label for="select-multiple">Select multiple</label>
	<select name="select-multiple" data-testid="select-multiple" multiple>
		<option value="1">One</option>
		<option value="2">Two</option>
		<option value="3">Three</option>
	</select>

	<!-- <button type="reset" data-testid="reset"> Reset </button> -->
</form>

<section id="discrete">
	<label for="discrete">Discrete input (outside form)</label>
	<input
		use:persist={{
			key: 'discrete'
		}}
		type="text"
		name="discrete"
		data-testid="discrete"
	/>
</section>
