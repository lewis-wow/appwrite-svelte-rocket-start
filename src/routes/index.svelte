<script lang="ts">
	import Layout from '$lib/components/Layout.svelte'
	import { _ } from 'svelte-i18n'
</script>

<Layout>
	<h1>Home</h1>
	<p>{$_('page.home.title')}</p>
</Layout>
