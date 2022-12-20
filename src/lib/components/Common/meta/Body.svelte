<script>
	import { onMount } from 'svelte'

	let className = null
	export { className as class }
	export let style = null

	let bodyElement

	onMount(() => {
		bodyElement = document.body
	})

	$: className !== null && bodyElement && (bodyElement.className = className)
	$: style !== null && bodyElement && (bodyElement.style.cssText = style)
</script>
