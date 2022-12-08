import { writable } from 'svelte/store'
import { databases, client } from './stores/appwrite'
import { Models, Query, RealtimeResponseEvent } from 'appwrite'
import { ID } from 'appwrite'
import type { Writable } from 'svelte/store'

class Collection {
	constructor(protected databaseId: string, protected collectionId: string) { }

	createDocument(data: { [key: string]: any } = {}, permissions: string[] = null) {
		return databases.createDocument(this.databaseId, this.collectionId, ID.unique(), data, permissions)
	}

	updateDocument(documentId: string, data: { [key: string]: any } = {}, permissions: string[] = null) {
		return databases.updateDocument(this.databaseId, this.collectionId, documentId, data, permissions)
	}

	deleteDocument(documentId: string) {
		return databases.deleteDocument(this.databaseId, this.collectionId, documentId)
	}

	createObserver() {
		const dataStore = writable<Models.Document[]>([])

		client.subscribe(`databases.${this.databaseId}.collections.${this.collectionId}.documents`, (response: RealtimeResponseEvent<any>) => {
			if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.*.create`)) {
				dataStore.update(current => {
					current.push(response.payload)
					return current
				})

				this.subscribeCollectionUpdate(response.payload, dataStore)
			}
		})

		return { subscribe: dataStore.subscribe }
	}

	createSubscriber(queries: string[] = []) {
		const loadingStore = writable(true)
		const dataStore = writable<Models.Document[]>([])

		databases.listDocuments(this.databaseId, this.collectionId, queries).then(data => {
			data.documents.forEach((document) => this.subscribeCollectionUpdate(document, dataStore))

			dataStore.set(data.documents)
			loadingStore.set(false)
		})

		return [{ subscribe: dataStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
	}

	createPaginate(limit: number, queries: string[] = []) {
		const dataStore = writable<Models.Document[]>([])
		const loadingStore = writable(true)
		let offset = 0

		const store = {
			subscribe: dataStore.subscribe,
			async next() {
				await databases.listDocuments(this.databaseId, this.collectionId, [...queries, Query.limit(limit), Query.offset(offset)]).then(data => {
					data.documents.forEach((document) => this.subscribeCollectionUpdate(document, dataStore))

					dataStore.update(current => [...current, ...data.documents])
					offset += limit
				})
			}
		}

		store.next().then(() => loadingStore.set(false))

		return [store, { subscribe: loadingStore.subscribe }] as const
	}

	protected subscribeCollectionUpdate(document: Models.Document, store: Writable<Models.Document[]>) {
		client.subscribe(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${document.$id}`, (response: RealtimeResponseEvent<any>) => {
			if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${document.$id}.delete`)) {
				store.update(current => {
					current.splice(current.indexOf(document), 1)
					return current
				})
				return
			}

			if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${document.$id}.update`)) {
				store.update(current => {
					current[current.indexOf(document)] = response.payload
					return current
				})
				return
			}
		})
	}
}

class Document {
	constructor(protected databaseId: string, protected collectionId: string, protected documentId: string) { }

	createSubscriber() {
		const dataStore = writable<Models.Document>(null)
		const loadingStore = writable(true)

		databases.getDocument(this.databaseId, this.collectionId, this.documentId).then(data => {
			dataStore.set(data)
			loadingStore.set(false)
		})

		client.subscribe(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${this.documentId}`, (response: RealtimeResponseEvent<any>) => {
			if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${this.documentId}.update`)) {
				dataStore.set(response.payload)
				return
			}

			if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${this.documentId}.delete`)) {
				dataStore.set(null)
				return
			}
		})

		return [{ subscribe: dataStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
	}
}

export { Collection, Document }
