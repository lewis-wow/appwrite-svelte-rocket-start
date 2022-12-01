import type { Account, Models } from 'appwrite'
import { writable } from 'svelte/store'

const oauthUser = (account: Account) => {
	const user = writable<Models.Account<Models.Preferences>>()
	const loading = writable(true)

	account.get().then(data => {
		user.set(data)
		loading.set(false)
	})

	return [
		{
			subscribe: user.subscribe,
			logout: () => {
				account.deleteSession('current')
				user.set(null)
			}
		},
		{ subscribe: loading.subscribe }
	] as const
}

export default oauthUser
