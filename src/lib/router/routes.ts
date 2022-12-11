import Layout from '$src/__layout.svelte'
import Loading from '$src/__loading.svelte'

import { ComponentType, SvelteComponentTyped  } from 'svelte'

export interface Route {
	component: () => Promise<any>,
	path: string,
	layout?: ComponentType<SvelteComponentTyped<any>>,
	loading?: ComponentType<SvelteComponentTyped<any>>,
}

interface RouteDefinition {
	component: () => Promise<any>,
	path: string,
	layout: ComponentType<SvelteComponentTyped<any>>,
	loading: ComponentType<SvelteComponentTyped<any>>,
}

interface RouteDefault {
	layout: ComponentType<SvelteComponentTyped<any>>,
	loading: ComponentType<SvelteComponentTyped<any>>,
}

const defineRoutes = (routes: Route[], { layout = Layout, loading = Loading }: RouteDefault = { layout: Layout, loading: Loading }): RouteDefinition[] => 
	routes.map(route => ({ ...route, layout: route?.layout ?? layout, loading: route?.loading ?? loading }))

export default defineRoutes
