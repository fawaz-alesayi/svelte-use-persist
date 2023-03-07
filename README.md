# svelte-use-persist

A Svelte action that saves forms and inputs client side to local storage and restores them on page load.

## Installation

```bash
npm install svelte-use-persist
```

## Features

- Persist any form or inputs to local storage (or your own stores) and restore them on page load automatically
- Currently supports and end-to-end tested with:
  - `<form>` or any element that contains inputs
  - `<input type="text">`
  - `<input type="email">`
  - `<input type="tel">`
  - `<input type="date">`
  - `<input type="number">`
  - `<input type="checkbox">`
  - `<input type="radio">`
  - `<input type="password">` (off by default, only use if you know what you're doing)
  - `<textarea>`
  - `<select>` (multiple not supported for now)

## Usage

#### Forms

Create a form and add the `use:persist` action to it. The action takes an object with a `key` property. This key is the identifier for the form in local storage.

##### Note

Make sure all inputs in the form have the `name` attribute. This is used to identify the input in local storage.

```svelte
<form
	use:persist={{
		key: 'my-form'
	}}
>
	<label for="title">Title</label>
	<input type="text" name="title" />

	<label for="content">Content</label>
	<textarea name="content" />

	<label for="date">Date</label>
	<input type="date" name="date" />

	<label for="phone">Phone</label>
	<input type="tel" name="phone" />

	<label for="email">Email</label>
	<input type="email" name="email" />

	<button type="submit">Save</button>
</form>
```

### Inputs

Create an input and add the `use:persist` action to it. The action takes an object with a `key` property. This key is the identifier for the input in local storage.

- Make sure your input has a `name` attribute

```svelte
<script>
	import { persist } from 'svelte-use-persist';
</script>

<input
	type="text"
	use:persist={{
		key: 'my-input'
	}}
/>
```

### Use with your own store

You can use this action with your own stores. Just pass the store as the `store` property in the action object and make sure you don't specify the `key` property. If you use your own store, the action will **not** save anything to local storage. It will only save the form or input value to your store.

```svelte
<script>
	import { persist } from 'svelte-use-persist';
	import { writable } from 'svelte/store';

	const store = writable({});
</script>

<input
	type="text"
	use:persist={{
		store
	}}
/>
```

## Why did you create this?

I run a compliance & legal startup where people have to fill out very long forms (70+ questions). I thought that It would be a really bad experience if one of our customers had to re-do the form. So svelte-use-persist was born!

# License

MIT