import { ComponentType, SvelteComponentTyped  } from 'svelte'

export interface Route {
	component: () => Promise<any>,
	path: string,
	layout?: ComponentType<SvelteComponentTyped<any>>,
	loading?: ComponentType<SvelteComponentTyped<any>>,
	before?: () => any,
}

interface RouteDefinition {
	component: () => Promise<any>,
	path: string,
	layout: ComponentType<SvelteComponentTyped<any>> | null,
	loading: ComponentType<SvelteComponentTyped<any>> | null,
	before: () => any | null,
}

interface RouteConfig {
	routes: Route[],
	layout?: ComponentType<SvelteComponentTyped<any>> | null,
	loading?: ComponentType<SvelteComponentTyped<any>> | null,
}

const defineRoutes = (config: RouteConfig): RouteDefinition[] => {
	return config.routes.map(route => ({ ...route, layout: route?.layout ?? config?.layout ?? null, loading: route?.loading ?? config?.loading ?? null, before: route?.before ?? null }))
}

export default defineRoutes
