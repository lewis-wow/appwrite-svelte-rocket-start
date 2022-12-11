<script lang="ts">
	import { onMount } from 'svelte'
	import type { ComponentType, SvelteComponentTyped } from 'svelte'
	import type { RouteLocation, RouteParams } from 'svelte-routing/types/Route'

	export let component: () => Promise<any>
	export let loading: ComponentType<SvelteComponentTyped<any>> | null = null
	export let location: RouteLocation
	export let params: RouteParams
	export let before: () => any

	let loadedComponent = null

	onMount(() => {
		before()

		component().then((module) => {
			loadedComponent = module.default
		})
	})
</script>

{#if loadedComponent}
	<svelte:component this={loadedComponent} {params} {location} />
{:else if loading}
	<svelte:component this={loading} {params} {location} />
{/if}
