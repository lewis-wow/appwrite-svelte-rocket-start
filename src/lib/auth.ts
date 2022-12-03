import type { Models } from 'appwrite'
import { writable } from 'svelte/store'
import { account } from './stores/appwrite'

const userStore = writable<Models.Account<Models.Preferences>>(null)
const loadingStore = writable(true)

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


