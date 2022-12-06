import { writable } from 'svelte/store'
import { databases, client } from './stores/appwrite'
import { Models, Query, RealtimeResponseEvent } from 'appwrite'
import { ID } from 'appwrite'
import type { Writable } from 'svelte/store'

const subscribeUpdate = (databaseId: string, collectionId: string, store: Writable<Models.Document[]>, document: Models.Document) => {
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

const subscribeInsert = (databaseId: string, collectionId: string, store: Writable<Models.Document[]>) => {
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

/**
 * Subscribe collection insert
 * @param databaseId 
 * @param collectionId 
 * @returns 
 */
const observe = (databaseId: string, collectionId: string) => {
	const dataStore = writable<Models.Document[]>([])
	subscribeInsert(databaseId, collectionId, dataStore)
	return { subscribe: dataStore.subscribe }
}


/**
 * Subscribe collection update, delete
 * @param databaseId 
 * @param collectionId 
 * @param queries 
 * @returns 
 */
const subscribe = (databaseId: string, collectionId: string, queries: string[]) => {
	const loadingStore = writable(true)
	const dataStore = writable<Models.Document[]>([])

	databases.listDocuments(databaseId, collectionId, queries).then(data => {
		data.documents.forEach((document) => subscribeUpdate(databaseId, collectionId, dataStore, document))

		dataStore.set(data.documents)
		loadingStore.set(false)
	})

	return [{ subscribe: dataStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
}

/**
 * Paginate collection
 * @param databaseId 
 * @param collectionId 
 * @param limit 
 * @returns 
 */
const paginate = (databaseId: string, collectionId: string, limit: number, queries: string[] = []) => {
	const dataStore = writable<Models.Document[]>([])
	const loadingStore = writable(true)
	let offset = 0

	const store = {
		subscribe: dataStore.subscribe,
		async next() {
			await databases.listDocuments(databaseId, collectionId, [...queries, Query.limit(limit), Query.offset(offset)]).then(data => {
				data.documents.forEach((document) => subscribeUpdate(databaseId, collectionId, dataStore, document))

				dataStore.update(current => [...current, ...data.documents])
				offset += limit
			})
		}
	}

	store.next().then(() => loadingStore.set(false))

	return [store, { subscribe: loadingStore.subscribe }] as const
}

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
		return observe(this.databaseId, this.collectionId)
	}

	createSubscriber(queries: string[] = []) {
		return subscribe(this.databaseId, this.collectionId, queries)
	}

	createPaginate(limit: number, queries: string[] = []) {
		return paginate(this.databaseId, this.collectionId, limit, queries)
	}
}

export default Collection
