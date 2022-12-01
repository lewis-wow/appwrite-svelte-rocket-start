<script lang="ts">
	import type { RouteLocation } from 'svelte-routing/types/Route'
	import Redirect from './Redirect.svelte'

	export let fallback: string
	export let allow: boolean
	export let location: RouteLocation
</script>

{#if allow}
	<slot />
{:else}
	<Redirect to={fallback} replace state={{ from: location.pathname }} />
{/if}
