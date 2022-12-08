import { storage, client } from './stores/appwrite'
import { ID, Models, RealtimeResponseEvent } from 'appwrite'
import { Writable, writable } from 'svelte/store'

class Storage {
	constructor(protected bucketId: string) { }

	createFile(file, permissions: string[] = []) {
		return storage.createFile(this.bucketId, ID.unique(), file, permissions)
	}

	deleteFile(fileId: string) {
		return storage.deleteFile(this.bucketId, fileId)
	}

	updateFile(fileId: string, permissions: string[] = []) {
		return storage.updateFile(this.bucketId, fileId, permissions)
	}

	createUploadDispatcher(acceptManyFiles = false) {
		return (node: HTMLInputElement) => {
			const eventListener = (e) => {
				const files = acceptManyFiles ? e.target.files : [e.target.files[0]]
				files.forEach((file) => this.createFile(file))
			}

			node.addEventListener('change', eventListener)

			return {
				destroy() {
					node.removeEventListener('change', eventListener)
				},
			}
		}
	}

	createSubsciber(queries: string[] = [], search = '') {
		const filesStore = writable<Models.File[]>([])
		const loadingStore = writable(true)

		storage.listFiles(this.bucketId, queries, search).then(files => {
			for (const file of files.files) {
				this.subscribeFileUpdate(file, filesStore)
			}
		})

		return [{ subscribe: filesStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
	}

	createObserver() {
		const dataStore = writable<Models.File[]>([])

		client.subscribe(`buckets.${this.bucketId}.files`, (response: RealtimeResponseEvent<any>) => {
			if (response.events.includes(`buckets.${this.bucketId}.files.*.create`)) {
				dataStore.update(current => {
					current.push(response.payload)
					return current
				})

				this.subscribeFileUpdate(response.payload, dataStore)
			}
		})

		return { subscribe: dataStore.subscribe }
	}

	protected subscribeFileUpdate(file: Models.File, filesStore: Writable<Models.File[]>) {
		client.subscribe(`buckets.${this.bucketId}.files.${file.$id}`, (response: RealtimeResponseEvent<any>) => {
			if (response.events.includes(`buckets.${this.bucketId}.files.${file.$id}.update`)) {
				filesStore.update(current => {
					current[current.indexOf(file)] = file
					return current
				})
				return
			}

			if (response.events.includes(`buckets.${this.bucketId}.files.${file.$id}.delete`)) {
				filesStore.update(current => {
					current.splice(current.indexOf(file), 1)
					return current
				})
				return
			}
		})
	}
}

class File {
	constructor(protected bucketId: string, protected fileId: string) { }

	createSubscriber() {
		const fileStore = writable<Models.File>(null)
		const loadingStore = writable(true)

		storage.getFile(this.bucketId, this.fileId).then((result) => {
			fileStore.set(result)
			loadingStore.set(false)
		})

		client.subscribe(`buckets.${this.bucketId}.files.${this.fileId}`, (response: RealtimeResponseEvent<any>) => {
			if (response.events.includes(`buckets.${this.bucketId}.files.${this.fileId}.update`)) {
				fileStore.set(response.payload)
				return
			}

			if (response.events.includes(`buckets.${this.bucketId}.files.${this.fileId}.delete`)) {
				fileStore.set(null)
				return
			}
		})

		return [{ subscribe: fileStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
	}
}

export { Storage, File }
