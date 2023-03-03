# svelte-use-persist

A Svelte action that can persist any form or input value to local storage (or your own store)

## Installation

```bash
npm install svelte-use-persist
```

## Features

- Persist any form (or any parent elements that contain inputs) or inputs local storage
- Supports all input types: `text`, `textarea`, `date`, `email`, `tel`, `number`, `checkbox`, `radio`, `select`, `file`, `range`, `color`, `time`, `week`

## Usage

#### Forms

Create a form and add the `use:persist` action to it. The action takes an object with a `key` property. This key is used to store the form values in local storage.

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