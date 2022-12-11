<script lang="ts">
	import './main.scss'
	import { i18n, isLoading } from './locales/i18n'
	import { onMount } from 'svelte'
	import { Router, Route } from '$lib/router'

	/** layout */
	import routes from './__routes'
	import Error from './__error.svelte'
	import LazyRoute from '$lib/router/LazyRoute.svelte'

	let isMounted = false
	onMount(() => {
		/** init i18n */
		i18n()

		/** register service worker */
		if ('serviceWorker' in window.navigator) {
			window.navigator.serviceWorker.register('/serviceworker.js', {
				scope: '/',
			})
		}

		isMounted = true
	})
</script>

<Router>
	{#if !$isLoading && isMounted}
		{#each routes as { path, layout, component }}
			<svelte:component this={layout}>
				<LazyRoute {path} {component} />
			</svelte:component>
		{/each}
		<Route path="/*" component={Error} />
	{/if}
</Router>
