<script lang="ts">
	import { navigate } from '$lib/router'
	import { onMount } from 'svelte'

	onMount(() => {
		const currentTitle = document.title
		document.title = 'Authorizing...'

		navigate('/', { replace: true })
		return () => (document.title = currentTitle)
	})
</script>

<p>Authorizing...</p>
