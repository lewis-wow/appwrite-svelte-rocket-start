<script lang="ts">
	import './main.scss'
	import { i18n, isLoading } from './locales/i18n'
	import { onMount } from 'svelte'
	import { Router } from '$lib/router'

	import Routes from './__routes.svelte'

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
		<Routes />
	{/if}
</Router>
