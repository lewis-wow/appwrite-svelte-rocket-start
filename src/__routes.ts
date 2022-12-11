import { defineRoutes } from '$lib/router';

import Layout from '$src/__layout.svelte'
import Loading from '$src/__loading.svelte'

export default defineRoutes({
	routes: [
		{ 
			path: '/', 
			component: () => import('./routes/index.svelte') 
		},
		{ 
			path: '/oauth', 
			component: () => import('$routes/oauth/index.svelte') 
		},
		{ 
			path: '/oauth/failure', 
			component: () => import('$routes/oauth/failure.svelte') 
		},
		{ 
			path: '/oauth/success', 
			component: () => import('$routes/oauth/success.svelte') 
		},
	],
	layout: Layout,
	loading: Loading,
})
