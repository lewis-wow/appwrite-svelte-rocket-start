<script lang="ts">
	import { Github } from '@icons-pack/svelte-simple-icons'
	import { account, url } from '$lib/stores/appwrite'
	import Layout from '$lib/components/Layout.svelte'
</script>

<Layout>
	<h1>Sign in</h1>

	<button on:click={() => account.createOAuth2Session('github', url.oauth.success, url.oauth.failure)}>
		<Github />
	</button>
</Layout>
