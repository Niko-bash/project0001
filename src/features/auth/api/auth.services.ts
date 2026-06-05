import type { AuthUser, CreateUser, User } from './type'

const COOKIE_KEYS = {
	SESSION: 'session'
}
export const AuthServices = {
	async getSessionCookie(): Promise<CookieListItem | null> {
		try {
			const cookie = await cookieStore.get(COOKIE_KEYS.SESSION)

			if (!cookie) {
				return null
			}

			return cookie
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	},
	async setSessionCookie(data: User): Promise<CookieListItem> {
		try {
			await cookieStore.set(COOKIE_KEYS.SESSION, JSON.stringify(data))

			const cookie = await this.getSessionCookie()
			if (!cookie) {
				throw new Error()
			}
			return cookie
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	},
	async getSession() {},
	async SingUp(data: AuthUser): Promise<unknown> {
		const response = await fetch(`/api/user?email=${data.email}`, {
			method: 'GET'
		})

		if (!response.ok) {
			console.error('BadRequest')
			return
		}

		const users: User[] = await response.json()
		const user = users[0]

		if (user?.email === data.email) {
			console.error('this user is already registered')
			return
		}

		const createDataUser: CreateUser = {
			...data,
			role: 'user',
			name: data.email
		}

		const createUser = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify(createDataUser)
		})

		if (!createUser.ok) {
			console.log('bad registr')
			return
		}

		const thisUser: User = await createUser.json()
		const cookie = await this.setSessionCookie(thisUser)

		if (!cookie) {
			return 'bad'
		}

		const { id, ...userData } = thisUser

		return {
			status: 200,
			success: true,
			data: userData
		}
	},
	async SingIn() {},
	async logout() {}
}
