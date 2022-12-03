import { client } from '../stores/appwrite'
import type { Models, RealtimeResponseEvent } from 'appwrite'
import type { Writable } from 'svelte/store'
import subscribeUpdate from './subscribeUpdate'

export default (databaseId: string, collectionId: string, store: Writable<Models.Document[]>) => {
	client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, (response: RealtimeResponseEvent<any>) => {
		if (response.events.includes(`databases.${databaseId}.collections.${collectionId}.documents.*.create`)) {
			let lastIndex = 0

			store.update(current => {
				current.push(response.payload)
				lastIndex = current.length - 1
				return current
			})

			subscribeUpdate(databaseId, collectionId, store, response.payload)
		}
	})
}
