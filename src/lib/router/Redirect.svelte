<script lang="ts">
	import { onMount } from 'svelte'
	import { navigate } from 'svelte-routing'

	export let to: string
	export let state: any
	export let replace = false

	onMount(() => navigate(to, { replace, state }))
</script>
