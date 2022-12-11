import { Route, Router, link, links, Link } from 'svelte-routing'
import { navigate, back, forward } from './router/navigate'
import Redirect from "./router/Redirect.svelte"
import ProtectedRoute from "./router/ProtectedRoute.svelte"
import LazyRoute from "./router/LazyRoute.svelte"
import defineRoutes from "./router/routes"

export { Route, Router, Link, link, links, navigate, back, forward, Redirect, ProtectedRoute, LazyRoute, defineRoutes }
