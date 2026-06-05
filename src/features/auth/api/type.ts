type UserRole = 'admin' | 'user'

export type User = {
	id: string
	email: string
	password: string
	avatar?: string
	role: UserRole
}

export type AuthUser = Pick<User, 'email' | 'password'>
