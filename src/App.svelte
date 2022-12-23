<script lang="ts">
	import './main.scss'
	import { i18n, isLoading as localeLoading } from '$lib/locales'
	import { isLoading as authLoading } from '$lib/auth'
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
	{#if isReady}
		<Routes />
	{/if}
</div>
