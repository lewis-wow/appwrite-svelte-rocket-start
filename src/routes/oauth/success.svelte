<script lang="ts">
	import { Redirect } from '$lib/router'
	import Layout from '$lib/components/Layout.svelte'
</script>

<svelte:head>
	<title>Authorizing...</title>
</svelte:head>

<Layout>
	<p>Authorizing...</p>
	<Redirect to="/" />
</Layout>
