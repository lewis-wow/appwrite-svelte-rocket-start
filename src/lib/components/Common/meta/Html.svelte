<script>
	import { onMount } from 'svelte'

	export let lang = null
	let className = null
	export { className as class }
	export let style = null
	export let xmlns = null

	let htmlElement

	onMount(() => {
		htmlElement = document.documentElement
	})

	$: className !== null && htmlElement && (htmlElement.className = className)
	$: lang !== null && htmlElement && (htmlElement.lang = lang)
	$: style !== null && htmlElement && (htmlElement.style.cssText = style)
	$: xmlns !== null && htmlElement && (htmlElement.xmlns = xmlns)
</script>
