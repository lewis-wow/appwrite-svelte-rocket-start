<script>
	import { installPrompt } from '../../stores/pwaInstall'

	const install = async () => {
		if ($installPrompt !== null) {
			$installPrompt.prompt()
			const { outcome } = await $installPrompt.userChoice

			if (outcome === 'accepted') $installPrompt = null
		}
	}
</script>

<svelte:window
	on:beforeinstallprompt|preventDefault={(e) => {
		$installPrompt = e
	}}
/>

{#if $installPrompt}
	<slot {install} />
{/if}
