import { navigate as nav } from 'svelte-routing'

export const navigate = (to: string | number, options?: { replace?: boolean, state?: { [k in string | number]: unknown } }) => {
	if (typeof to === 'string') return nav(to, options)
	window.history.go(to)
}

export const back = () => window.history.back()
export const forward = () => window.history.forward()
