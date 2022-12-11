<script lang="ts">
	import type { ComponentType, SvelteComponentTyped } from 'svelte'

	export let path: string
	export let component: () => Promise<any>
	export let loading: ComponentType<SvelteComponentTyped<any>> | null = null

	import { Route } from '$lib/router'
	import LazyRouteGuard from './LazyRouteGuard.svelte'
</script>

<Route {path} let:location let:params>
	<LazyRouteGuard {location} {params} {component} {loading} />
</Route>
