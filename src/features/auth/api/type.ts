import type { CoursesType } from '@/features/courses/api/type'

type UserRole = 'admin' | 'user'

export type User = {
	id: string
	email: string
	name: string
	password: string
	avatar?: string
	role: UserRole
	course: CoursesType[]
}

export type AuthUser = Pick<User, 'email' | 'password'>
export type CreateUser = Omit<User, 'id'>
export type SessionUser = Omit<User, 'password'>
