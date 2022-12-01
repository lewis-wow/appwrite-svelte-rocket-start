<script lang="ts">
	import { link } from '$lib/router'

	export let href: string | null = null
	let className = ''
	export { className as class }
</script>

<a {href} class={className} use:link on:click|preventDefault>
	<slot />
</a>
