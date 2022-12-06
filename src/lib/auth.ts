import type { Models } from 'appwrite'
import { writable } from 'svelte/store'
import { account, client } from './stores/appwrite'

const userStore = writable<Models.Account<Models.Preferences>>(null)
const loadingStore = writable(true)

client.subscribe('account', response => {
	// Callback will be executed on all account events.
	console.log(response)
})

account.get().then(data => {
	userStore.set(data)
	loadingStore.set(false)
})

export const user = { subscribe: userStore.subscribe }
export const isLoading = { subscribe: loadingStore.subscribe }

export const logout = () => {
	account.deleteSession('current').then(() => {
		userStore.set(null)
	})
}


