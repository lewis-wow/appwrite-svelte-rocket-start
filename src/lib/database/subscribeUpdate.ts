import { client } from '../stores/appwrite'
import type { Models, RealtimeResponseEvent } from 'appwrite'
import type { Writable } from 'svelte/store'

export default (databaseId: string, collectionId: string, store: Writable<Models.Document[]>, document: Models.Document) => {
	client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${document.$id}`, (response: RealtimeResponseEvent<any>) => {

		if (response.events.includes(`databases.${databaseId}.collections.${collectionId}.documents.${document.$id}.delete`)) {
			store.update(current => {
				current.splice(current.indexOf(document), 1)
				return current
			})
			return
		}

		if (response.events.includes(`databases.${databaseId}.collections.${collectionId}.documents.${document.$id}.update`)) {
			store.update(current => {
				current[current.indexOf(document)] = response.payload
				return current
			})
			return
		}

	})
}
