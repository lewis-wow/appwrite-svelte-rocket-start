<script lang="ts">
	import Collection from '$lib/database'
	import { _ } from 'svelte-i18n'

	const collection = new Collection('6388a5e235c0c0fc8054', '6388a5e930cfd8a7ae56')

	const [subscriber] = collection.createPaginate(1)

	$: console.log($subscriber)
</script>

<h1>Home</h1>
<p>{$_('page.home.title')}</p>

<button on:click={() => subscriber.next()}>Next</button>
