import { Models, RealtimeResponseEvent, Account } from 'appwrite'
import { writable } from 'svelte/store'
import { client } from './appwrite'

const account = new Account(client)
const userStore = writable<Models.Account<Models.Preferences>>(null)
const isLoadingStore = writable(true)

client.subscribe('account', (response: RealtimeResponseEvent<any>) => {
	if (response.events.includes('users.*.sessions.*.delete')) {
		return userStore.set(null)
	}

	if (response.events.includes('users.*.sessions.*.update')) {
		return userStore.set(response.payload)
	}

	if (response.events.includes('users.*.sessions.*.create')) {
		return account.get().then(data => userStore.set(data))
	}
})

account.get().then(data => {
	userStore.set(data)
	isLoadingStore.set(false)
}).catch(() => isLoadingStore.set(false))

const isLoading = { subscribe: isLoadingStore.subscribe }
const user = { subscribe: userStore.subscribe }

export { account, user, isLoading }
