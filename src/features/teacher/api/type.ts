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
export type HomeworkStatus = 'idle' | 'success' | 'error' | 'loading'

export type StateHomework = {
	homework: Homework[]
	status: HomeworkStatus
	error: Error | null
}

export type ActionHomework =
	| RequestHomework
	| FailHomework
	| SuccessHomework
	| ResetHomework

type RequestHomework = {
	type: 'request'
}

type SuccessHomework = {
	type: 'success'
	homework: Homework[]
}

type FailHomework = {
	type: 'fail'
	error: Error
}

type ResetHomework = {
	type: 'reset'
}

export interface ITeacherServices {
	getAllStudents: (
		coursesId: string,
		signal?: AbortSignal
	) => Promise<ApiResponse<UserTableData[]>>
	getAllStudentsPagination: (
		coursesId: string,
		page: number,
		limit: number,
		signal?: AbortSignal
	) => Promise<ApiResponse<InfinityStudentsTableDataAdapter<UserTableData>>>
	createAddingHomework: (
		data: CreateHomework,
		studentId: string
	) => Promise<ApiResponse<StudentHomeWork>>
	getStudentHomeWork: (
		studentId: string,
		signal?: AbortSignal
	) => Promise<ApiResponse<Homework[]>>
}

export type StatusStudents = 'idle' | 'loading' | 'success' | 'error'

export type StateStudents = {
	students: InfinityStudentsTableDataAdapter<UserTableData>
	status: StatusStudents
	error: Error | null
	page: number
}

export type ActionStudents =
	| RequestStudents
	| SuccessStudents
	| FailStudents
	| ResetStudents

type RequestStudents = {
	type: 'request'
}

type SuccessStudents = {
	type: 'success'
	students: InfinityStudentsTableDataAdapter<UserTableData>
	page: number
}

type FailStudents = {
	type: 'fail'
	error: Error
	page: number
}

type ResetStudents = {
	type: 'reset'
}
