<script lang="ts">
	import '$src/main.scss'
	import { i18n, isLoading } from './locales/i18n'
	import { Router, Route } from '$lib/router'
	import Index from './routes/index.svelte'

	/** init i18n */
	i18n()

	/** register service worker */
	if ('serviceWorker' in window.navigator) {
		window.navigator.serviceWorker.register('/serviceworker.js', {
			scope: '/',
		})
	}
</script>

<main>
	{#if !$isLoading}
		<Router>
			<Route path="/" component={Index} />
		</Router>
	{/if}
</main>
