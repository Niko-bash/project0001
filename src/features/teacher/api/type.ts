import type { User } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
import type { UserCourses } from '@/features/my-courses/api/type'
import type { ApiResponse } from '@/shared/api/type'

export type UserTableData = Pick<User, 'id' | 'email' | 'name'> & {
	status?: boolean
}

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

export type StatusHomeWork = 'completed' | 'review' | 'overdue' | 'progress'

export type Homework = {
	id: string
	name: string
	description: string
	date: string
	status: StatusHomeWork
}

export type CreateHomework = Omit<Homework, 'id'>

export type StudentHomeWork = {
	id: string
	studentId: string
	homework: Homework[]
}
export type HomeStatus = 'idle' | 'success' | 'error' | 'loading'

export type State = {
	homework: Homework[]
	status: HomeStatus
	error: Error | null
}

export type Action = Request | Fail | Success | Reset

type Request = {
	type: 'request'
}

type Success = {
	type: 'success'
	homework: Homework[]
}

type Fail = {
	type: 'fail'
	error: Error
}

type Reset = {
	type: 'reset'
}

export interface ITeacherServices {
	getAllStudents: (coursesId: string) => Promise<ApiResponse<UserTableData[]>>
	getAllStudentsPagination: (
		coursesId: string,
		page: number,
		limit: number
	) => Promise<ApiResponse<InfinityStudentsTableDataAdapter<UserTableData>>>
	createAddingHomework: (
		data: CreateHomework,
		studentId: string
	) => Promise<ApiResponse<StudentHomeWork>>
	getStudentHomeWork: (studentId: string) => Promise<ApiResponse<Homework[]>>
}
