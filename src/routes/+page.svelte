<script>
	import { persist } from '$lib';
</script>

<form use:persist id="test">
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
