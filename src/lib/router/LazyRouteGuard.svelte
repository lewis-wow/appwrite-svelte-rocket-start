<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte'
	import type { ComponentType, SvelteComponentTyped } from 'svelte'
	import type { RouteLocation, RouteParams } from 'svelte-routing/types/Route'

	export let component: (() => Promise<any>) | ComponentType<SvelteComponentTyped<any>>
	export let loading: ComponentType<SvelteComponentTyped<any>> | null = null
	export let location: RouteLocation
	export let params: RouteParams
	export let before: (() => any) | null = null

	let loadedComponent = null

	onMount(async () => {
		if (before !== null) {
			await before()
		}

		if (component instanceof SvelteComponent) {
			loadedComponent = component
			return
		}

		;(component as () => Promise<any>)().then((module) => {
			loadedComponent = module.default
		})
	})
</script>

{#if loadedComponent}
	<svelte:component this={loadedComponent} {params} {location} />
{:else if loading}
	<svelte:component this={loading} {params} {location} />
{/if}
