<script lang="ts">
	import { Route } from 'svelte-routing'
	import ProtectedRouteGuard from './ProtectedRouteGuard.svelte'

	export let path: string
	export let fallback = '/'
	export let allow = true
	export let component: any = null
</script>

<Route {path} let:params let:location>
	<ProtectedRouteGuard {allow} {fallback} {location}>
		{#if component !== null}
			<svelte:component this={component} {location} {params} />
		{:else}
			<slot {params} {location} />
		{/if}
	</ProtectedRouteGuard>
</Route>
