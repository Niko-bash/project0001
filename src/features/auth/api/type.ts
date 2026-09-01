import type { ProfileUser } from '@/features/user'
import type { ApiResponse } from '@/shared/api/type'

type UserRole = 'admin' | 'user'

export type User = {
	id: string
	email: string
	name: string
	password: string
	avatar: string | undefined
	role: UserRole
}

export type AuthUser = Pick<User, 'email' | 'password'>
export type CreateUser = Omit<User, 'id'>
export type SessionUser = Omit<User, 'password'>

export interface IAuthServices {
	getSessionCookie: () => Promise<
		(CookieListItem & { avatar: string | null }) | null
	>
	setSessionCookie: (
		data: SessionUser | ProfileUser
	) => Promise<CookieListItem & { avatar: string | null }>
	getSession: () => Promise<SessionUser | null>
	SingUp: (data: AuthUser) => Promise<ApiResponse<SessionUser>>
	SingIn: (data: AuthUser) => Promise<ApiResponse<SessionUser>>
	logout: () => Promise<boolean>
}
