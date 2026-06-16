import type { ProfileUser } from '@/features/user/api/type'
import {
	RegistrationError,
	UnauthorizedError,
	type ApiResponse
} from '@/shared/api/type'
import type { AuthUser, CreateUser, SessionUser, User } from './type'

const COOKIE_KEYS = {
	SESSION: 'session'
}
const LOCAL_STORAGE_KEYS = {
	IMAGE: 'image'
}
export const AuthServices = {
	async getSessionCookie(): Promise<
		(CookieListItem & { avatar: string | null }) | null
	> {
		try {
			const cookie = await cookieStore.get(COOKIE_KEYS.SESSION)
			const avatar = localStorage.getItem(LOCAL_STORAGE_KEYS.IMAGE)
			if (!cookie) {
				return null
			}

			return {
				...cookie,
				avatar
			}
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	},
	async setSessionCookie(
		data: SessionUser | ProfileUser
	): Promise<CookieListItem & { avatar: string | null }> {
		try {
			const { avatar, ...restData } = data
			await cookieStore.set(COOKIE_KEYS.SESSION, JSON.stringify(restData))
			localStorage.setItem(LOCAL_STORAGE_KEYS.IMAGE, JSON.stringify(avatar))

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
	async getSession(): Promise<SessionUser | null> {
		try {
			const session = await this.getSessionCookie()
			if (!session) {
				return null
			}

			const user: SessionUser = typeof session.value !== 'undefined' && {
				...JSON.parse(session.value),
				avatar: session.avatar
			}
			return user
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	},
	async SingUp(data: AuthUser): Promise<ApiResponse<SessionUser>> {
		const response = await fetch(`/api/user?email=${data.email}`, {
			method: 'GET'
		})

		if (!response.ok) {
			throw new RegistrationError()
		}

		const users: User[] = await response.json()
		const user = users[0]

		if (user?.email === data.email) {
			throw new RegistrationError()
		}

		const createDataUser: CreateUser = {
			...data,
			role: 'user',
			name: data.email,
			courses: []
		}

		const createUser = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify(createDataUser)
		})

		if (!createUser.ok) {
			throw new RegistrationError()
		}

		const thisUser: User = await createUser.json()
		const { password, ...userData } = thisUser

		const cookie = await this.setSessionCookie(userData)

		if (!cookie) {
			throw new Error()
		}

		return {
			status: 201,
			success: true,
			data: userData
		}
	},
	async SingIn(data: AuthUser): Promise<ApiResponse<SessionUser>> {
		const response = await fetch(`/api/user?email=${data.email}`, {
			method: 'GET'
		})
		if (!response.ok) {
			throw new UnauthorizedError('.sdf')
		}

		const users = await response.json()
		const user: User = users[0]

		if (user?.password !== data.password) {
			throw new UnauthorizedError()
		}
		const { password, ...newData } = user

		await this.setSessionCookie(newData)

		return {
			status: 200,
			success: true,
			data: newData
		}
	},
	async logout(): Promise<boolean> {
		try {
			await cookieStore.delete(COOKIE_KEYS.SESSION)
			localStorage.removeItem(LOCAL_STORAGE_KEYS.IMAGE)

			const cookie = await this.getSessionCookie()
			if (cookie) {
				return false
			}
			return true
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	}
}
