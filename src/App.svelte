<script lang="ts">
	import './main.scss'
	import { i18n, isLoading as localeLoading } from '$lib/locales'
	import { isLoading as authLoading } from '$lib/appwrite'
	import { onMount } from 'svelte'

	import Routes from './__routes.svelte'

	let isMounted = false
	$: isReady = $localeLoading === false && $authLoading === false && isMounted

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

<div>
	<!-- you can display loading while app is not ready (waiting for user and i18n) -->
	{#if isReady}
		<Routes />
	{/if}
</div>
