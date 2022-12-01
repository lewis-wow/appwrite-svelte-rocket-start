import { writable } from 'svelte/store'
import { client, databases } from './stores/appwrite'
import type { Models, RealtimeResponseEvent } from 'appwrite'

export const createCollectionSubscriber = (databaseId: string, collectionId: string) => {
	const store = writable<Models.Document[]>([])

	databases.listDocuments(databaseId, collectionId).then(data => store.set(data.documents))

	client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, (response: RealtimeResponseEvent<any>) => {
		store.update(current => {
			const index = current.findIndex(item => item.$id === response.payload.$id)
			if (index === -1) return current

			current[index] = response.payload
			return current
		})
	})

	return store
}

export const createDocumentSubscriber = (databaseId: string, collectionId: string, documentId: string) => {
	const store = writable<Models.Document>(null)

	databases.getDocument(databaseId, collectionId, documentId).then(data => store.set(data.documents))

	client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${documentId}`, (response) => {
		store.set(response.payload as Models.Document)
	})

	return store
}
