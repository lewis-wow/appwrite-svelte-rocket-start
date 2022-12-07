<script>
	import { account, url } from '$lib/stores/appwrite'
</script>

<div>
	<button on:click={() => account.createOAuth2Session('github', url.oauth.success, url.oauth.failure)}> Github </button>
</div>
