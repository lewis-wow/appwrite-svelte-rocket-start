import { writable } from 'svelte/store'

export const promiseStore = <T>(value: Promise<T>) => {
	const dataStore = writable<T>(null)
	const loadingStore = writable(true)
	const errorStore = writable(null)

	Promise.resolve(value).then(data => {
		dataStore.set(data)
		loadingStore.set(false)
	}, err => {
		errorStore.set(err)
		loadingStore.set(false)
	})

	return [dataStore, loadingStore, errorStore] as const
}
