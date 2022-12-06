<script lang="ts">
	import './main.scss'
	import { i18n, isLoading } from './locales/i18n'
	import { Router, Route } from '$lib/router'
	import { onMount } from 'svelte'

	/** layout */
	import Error from './__error.svelte'
	import Layout from './__layout.svelte'

	/** routes */
	import Index from './routes/index.svelte'

	/** oauth routes */
	import Failure from './routes/oauth/failure.svelte'
	import OAuth from './routes/oauth/index.svelte'
	import Success from './routes/oauth/success.svelte'

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
	<Layout>
		{#if !$isLoading && isMounted}
			<Route path="/" component={Index} />
			<Route path="/oauth" component={OAuth} />
			<Route path="/oauth/failure" component={Failure} />
			<Route path="/oauth/success" component={Success} />

			<Route path="/*" component={Error} />
		{/if}
	</Layout>
</Router>
