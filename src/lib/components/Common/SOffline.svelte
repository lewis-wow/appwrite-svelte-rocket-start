<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	$: isOnline = navigator.onLine || false

	const updateOnlineStatus = () => {
		isOnline = navigator.onLine
		dispatch('detectedCondition', { online: isOnline })
	}
</script>

<svelte:window on:online={updateOnlineStatus} on:offline={updateOnlineStatus} />

{#if isOnline}
	<slot name="online" />
{:else}
	<slot name="offline" />
{/if}
