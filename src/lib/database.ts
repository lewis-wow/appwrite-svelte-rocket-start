import { writable } from 'svelte/store'
import { databases } from './stores/appwrite'
import type { Models } from 'appwrite'
import { ID } from 'appwrite'
import subscribeInsert from './database/subscribeInsert'
import subscribeUpdate from './database/subscribeUpdate'

class Collection {
	constructor(protected databaseId: string, protected collectionId: string) { }

	subscribeInsert() {
		const dataStore = writable<Models.Document[]>([])
		subscribeInsert(this.databaseId, this.collectionId, dataStore)
		return { subscribe: dataStore.subscribe }
	}

	subscribe(queries: string[] = []) {
		const loadingStore = writable(true)
		const dataStore = writable<Models.Document[]>([])

		databases.listDocuments(this.databaseId, this.collectionId, queries).then(data => {
			data.documents.forEach((document) => subscribeUpdate(this.databaseId, this.collectionId, dataStore, document))

			dataStore.set(data.documents)
			loadingStore.set(false)
		})

		return [{ subscribe: dataStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
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

export default Collection
