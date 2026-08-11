import type { User } from '@/features/auth/api/type'
import type { UserCourses } from '@/features/my-courses/api/type'

export type UserTableData = Pick<User, 'id' | 'email' | 'name'>
export type InfinityStudentsTableData = {
	data: UserCourses[]
	first: number
	prev: number | null
	next: number | null
	last: number
	pages: number
	items: number
}

export type InfinityStudentsTableDataAdapter<T> = {
	data: T[]
	first: number
	prev: number | null
	next: number | null
	last: number
	pages: number
	items: number
}
