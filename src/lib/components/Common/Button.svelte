<script lang="ts">
	export let href: string = null
	let className = ''
	export { className as class }
</script>

{#if href !== null}
	<a {href} class={className}>
		<slot />
	</a>
{:else}
	<button class={className} on:click>
		<slot />
	</button>
{/if}
