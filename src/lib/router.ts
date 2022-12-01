import { Route, Router, link, links, Link } from 'svelte-routing'
import { navigate, back, forward } from './router/navigate'
import Redirect from "./router/Redirect.svelte"
import ProtectedRoute from "./router/ProtectedRoute.svelte"

export { Route, Router, Link, link, links, navigate, back, forward, Redirect, ProtectedRoute }
