import { defineRoutes } from '$lib/router';

export default defineRoutes([
	{ path: '/', component: () => import('$routes/index.svelte') },
	{ path: '/oauth', component: () => import('$routes/oauth/index.svelte') },
	{ path: '/oauth/failure', component: () => import('$routes/oauth/failure.svelte') },
	{ path: '/oauth/success', component: () => import('$routes/oauth/success.svelte') },
])
