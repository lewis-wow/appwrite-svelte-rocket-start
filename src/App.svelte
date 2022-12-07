<script lang="ts">
	import './main.scss'
	import { i18n, isLoading } from './locales/i18n'
	import { onMount } from 'svelte'
	import { Router, Route } from '$lib/router'

	/** layout */
	import Routes from './__routes.svelte'
	import Error from './__error.svelte'
	import Layout from './__layout.svelte'

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

<Layout>
	<Router>
		{#if !$isLoading && isMounted}
			<Routes />
			<Route path="/*" component={Error} />
		{/if}
	</Router>
</Layout>
