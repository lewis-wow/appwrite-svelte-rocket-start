import type { Models, RealtimeResponseEvent } from 'appwrite'
import { writable } from 'svelte/store'
import { account, client } from './stores/appwrite'

const userStore = writable<Models.Account<Models.Preferences>>(null)
const loadingStore = writable(true)

client.subscribe('account', (response: RealtimeResponseEvent<any>) => {
	if (response.events.includes('users.*.sessions.*.delete')) {
		return userStore.set(null)
	}

	if (response.events.includes('users.*.sessions.*.update')) {
		return userStore.set(response.payload)
	}
})

account.get().then(data => {
	userStore.set(data)
	loadingStore.set(false)
})

const user = {
	subscribe: userStore.subscribe,
	logout: () => account.deleteSession('current'),
	account: account
}

const isLoading = { subscribe: loadingStore.subscribe }

export { account, user, isLoading }
