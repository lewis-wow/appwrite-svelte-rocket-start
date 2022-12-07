<script lang="ts">
	import { Route } from '$lib/router'

	/** routes */
	import Index from '$routes/index.svelte'

	/** oauth routes */
	import Failure from '$routes/oauth/failure.svelte'
	import OAuth from '$routes/oauth/index.svelte'
	import Success from '$routes/oauth/success.svelte'
</script>

<Route path="/" component={Index} />
<Route path="/oauth" component={OAuth} />
<Route path="/oauth/failure" component={Failure} />
<Route path="/oauth/success" component={Success} />
