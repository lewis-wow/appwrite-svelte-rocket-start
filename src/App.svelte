<script lang="ts">
	import './main.scss'
	import { i18n, isLoading } from './locales/i18n'
	import Router from './Router.svelte'

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
		<Router />
	{/if}
</main>
