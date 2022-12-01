<script lang="ts">
	import { Github } from '@icons-pack/svelte-simple-icons'
	import { account, url } from '../../lib/stores/appwrite'
	import Link from '$lib/components/Link.svelte'
</script>

<main>
	<h1>Sign in</h1>
	<button on:click={() => account.createOAuth2Session('github', url.oauth.success, url.oauth.failure)}>
		<Github color="#FF3E00" size={90} />
	</button>

	<Link href="/">Home</Link>
</main>
