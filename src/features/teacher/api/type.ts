import type { User } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
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

export type Student = Omit<User, 'role' | 'avatar' | 'password'>

export type TeacherStudentLoaderData = {
	user: User
	data: CoursesType
	student: Student
}

export type TeacherLoaderData = Omit<TeacherStudentLoaderData, 'student'>
