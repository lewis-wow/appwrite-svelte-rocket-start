<script lang="ts">
	import Link from '$lib/components/Link.svelte'
	import { account } from '../lib/stores/appwrite'
	import Loading from '../lib/components/Loading.svelte'
	import oauth from '../lib/stores/oauth'

	const [user, loading] = oauth(account)
</script>

<main>
	<h1>Home</h1>

	{#if $loading}
		<Loading />
	{:else if $user?.status}
		{JSON.stringify($user)}
		<button on:click={() => user.logout()}>Logout</button>
	{:else}
		<Link href="/oauth">Sign in</Link>
	{/if}
</main>
