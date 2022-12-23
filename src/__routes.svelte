<script lang="ts">
	import { Router } from '$lib/router'

	import Layout from '$src/__layout.svelte'
	import Loading from '$src/__loading.svelte'
	import Error from '$src/__error.svelte'
</script>

<Router
	layout={Layout}
	loading={Loading}
	error={Error}
	routes={[
		{
			path: '/',
			component: () => import('$routes/index.svelte'),
		},
	]}
/>
