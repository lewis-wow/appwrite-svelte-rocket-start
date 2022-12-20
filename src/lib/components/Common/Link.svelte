<script lang="ts">
	import { link } from '$lib/router'

	export let href: string | null = null

	let className = ''
	export { className as class }

	const isValidHttpUrl = (string) => {
		let url: URL
		try {
			url = new URL(string)
		} catch (_) {
			return false
		}
		return url.protocol === 'http:' || url.protocol === 'https:'
	}
</script>

{#if href}
	{#if isValidHttpUrl(href)}
		<a {href} class={className}>
			<slot />
		</a>
	{:else}
		<a {href} class={className} use:link>
			<slot />
		</a>
	{/if}
{:else}
	<button class={className} on:click>
		<slot />
	</button>
{/if}
