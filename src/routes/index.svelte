<script lang="ts">
	import Layout from '$lib/components/Layout.svelte'
	import Collection from '$lib/database'
	import { Query } from 'appwrite'
	import { _ } from 'svelte-i18n'

	const collection = new Collection('', '')
	const [subscriber, loading] = collection.subscribe([Query.limit(5)])
	const insertSubscriber = collection.subscribeInsert()
</script>

<Layout>
	<h1>Home</h1>
	<p>{$_('page.home.title')}</p>
</Layout>
