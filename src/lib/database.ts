import { writable } from 'svelte/store'
import { client, databases } from './stores/appwrite'
import type { Models, RealtimeResponseEvent } from 'appwrite'
import { ID } from 'appwrite'

class CollectionSubscriber {
	protected store = writable<Models.Document[]>([])
	public subscribe = this.store.subscribe

	constructor(protected databaseId: string, protected collectionId: string) {
		databases.listDocuments(databaseId, collectionId).then(data => this.store.set(data.documents))

		client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, (response: RealtimeResponseEvent<any>) => {

			if (response.events.includes(`databases.${databaseId}.collections.${collectionId}.documents.*.delete`)) {
				this.store.update(current => {
					const index = current.findIndex(item => item.$id === response.payload.$id)
					if (index === -1) return current

					current.splice(index, 1)
					return current
				})
				return
			}

			if (response.events.includes(`databases.${databaseId}.collections.${collectionId}.documents.*.update`)) {
				this.store.update(current => {
					const index = current.findIndex(item => item.$id === response.payload.$id)
					if (index === -1) return current

					current[index] = response.payload
					return current
				})
				return
			}

			if (response.events.includes(`databases.${databaseId}.collections.${collectionId}.documents.*.create`)) {
				this.store.update(current => {
					current.push(response.payload)
					return current
				})
				return
			}

		})
	}

	add(data: { [key: string]: any } = {}, permissions: string[] = null) {
		return databases.createDocument(this.databaseId, this.collectionId, ID.unique(), data, permissions)
	}

	set(documentId: string, data: { [key: string]: any } = {}, permissions: string[] = null) {
		return databases.updateDocument(this.databaseId, this.collectionId, documentId, data, permissions)
	}

	delete(documentId: string) {
		return databases.deleteDocument(this.databaseId, this.collectionId, documentId)
	}
}

export default CollectionSubscriber
