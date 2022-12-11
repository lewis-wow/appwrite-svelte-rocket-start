<script lang="ts">
	import Link from '$lib/components/Link.svelte'
	import { _ } from 'svelte-i18n'
</script>

<h1>Home</h1>
<p>{$_('page.home.title')}</p>

<Link href="/oauth">Auth</Link>
