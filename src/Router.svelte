<script>
	import { Router, Route } from '$lib/router'

	/** routes */
	import Index from './routes/index.svelte'

	/** oauth routes */
	import Failure from './routes/oauth/failure.svelte'
	import OAuth from './routes/oauth/index.svelte'
	import Success from './routes/oauth/success.svelte'

	/** error 404 route */
	import Error404 from './routes/404.svelte'
</script>

<Router>
	<Route path="/" component={Index} />

	<Route path="/oauth" component={OAuth} />
	<Route path="/oauth/success" component={Success} />
	<Route path="/oauth/failure" component={Failure} />

	<Route path="/*" component={Error404} />
</Router>
