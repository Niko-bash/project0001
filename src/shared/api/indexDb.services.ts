import type { VideoType } from '@/features/courses/api/type'

class IndexDbVideo {
	private dbName = 'VideoStorage'
	private storeName = 'videos'
	private dbVersion = 1
	private db: IDBDatabase | null = null

	async openDb(): Promise<IDBDatabase> {
		if (this.db) return this.db

		return new Promise((res, rej) => {
			const request = indexedDB.open(this.dbName, this.dbVersion)

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result

				if (!db.objectStoreNames.contains(this.storeName)) {
					const store = db.createObjectStore(this.storeName, {
						keyPath: 'id',
						autoIncrement: true
					})
					store.createIndex('createdAt', 'createdAt', { unique: false })
					store.createIndex('title', 'title', { unique: false })
				}
			}

			request.onsuccess = (event) => {
				this.db = (event.target as IDBOpenDBRequest).result

				this.db.onerror = (event) => {
					console.error('Error IndexDb', event)
				}

				res(this.db)
			}

			request.onerror = (event) => {
				rej(
					new Error(
						`Error open IndexDb ${(event.target as IDBOpenDBRequest).error}`
					)
				)
			}
		})
	}
	private async getStore(
		mode: IDBTransactionMode = 'readonly'
	): Promise<IDBObjectStore> {
		const db = await this.openDb()
		const transaction = db.transaction(this.storeName, mode)
		return transaction.objectStore(this.storeName)
	}
	async saveVideo(video: VideoType): Promise<VideoType> {
		const store = await this.getStore('readwrite')

		return new Promise((res, rej) => {
			const request = store.put(video)

			request.onsuccess = () => {
				res(video)
			}
			request.onerror = () => {
				rej(new Error('Error saving in indexDb'))
			}
		})
	}
	async getVideo(id: string): Promise<string | undefined> {
		const store = await this.getStore()

		return new Promise((res, rej) => {
			const request = store.get(id)

			request.onsuccess = () => {
				res(request.result)
			}

			request.onerror = () => {
				rej(new Error('Error get video from indexDb'))
			}
		})
	}
	closeDb() {
		if (this.db) {
			this.db.close()
			this.db = null
		}
	}
}

export const IndexDbServices = new IndexDbVideo()
