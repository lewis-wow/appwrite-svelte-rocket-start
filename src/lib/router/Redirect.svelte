<script lang="ts">
	import { onMount } from 'svelte'
	import { navigate } from 'svelte-routing'

	export let to: string
	export let state: any = null
	export let replace = false

	export let then: (to: string) => any = () => null

	onMount(() => {
		navigate(to, { replace, state })
		then(to)
	})
</script>
