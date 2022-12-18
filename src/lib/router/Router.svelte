<script lang="ts">
	import { ComponentType, SvelteComponentTyped } from 'svelte'
	import { Route, Router } from 'svelte-routing'
	import LazyRouteGuard from './LazyRouteGuard.svelte'

	interface Route {
		path: string
		component: ComponentType<SvelteComponentTyped<any>> | (() => Promise<any>)
		before?: () => any
		layout?: ComponentType<SvelteComponentTyped<any>>
		loading?: ComponentType<SvelteComponentTyped<any>>
	}

	export let layout: ComponentType<SvelteComponentTyped<any>> | null = null
	export let loading: ComponentType<SvelteComponentTyped<any>> | null = null
	export let error: ComponentType<SvelteComponentTyped<any>> | null = null
	export let routes: Route[] = []
</script>

<Router>
	{#each routes as route}
		<Route path={route.path} let:location let:params>
			{#if route?.layout || layout}
				<svelte:component this={route?.layout ?? layout}>
					<LazyRouteGuard {location} {params} before={route?.before} loading={route?.loading ?? loading} component={route.component} />
				</svelte:component>
			{:else}
				<LazyRouteGuard {location} {params} before={route?.before} loading={route?.loading ?? loading} component={route.component} />
			{/if}
		</Route>
		{#if error}
			<Route path="/*" component={error} />
		{/if}
	{/each}
</Router>
