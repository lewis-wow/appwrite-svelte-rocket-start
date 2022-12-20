<script>
	export let checked = false

	let className = ''
	export { className as class }
</script>

<input
	type="checkbox"
	class="{className} shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
	{checked}
	{...$$restProps}
/>
