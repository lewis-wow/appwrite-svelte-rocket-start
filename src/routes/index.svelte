<script lang="ts">
	import Layout from '../lib/components/Layout.svelte'
	import { createCollectionSubscriber } from '$lib/database'

	const names = createCollectionSubscriber('6388a5e235c0c0fc8054', '6388a5e930cfd8a7ae56')
</script>

<Layout>
	<h1>Home</h1>

	<div>
		{#each $names as { name }}
			<p>{name}</p>
		{/each}
	</div>
</Layout>
