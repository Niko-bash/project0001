import type { CoursesType } from '@/features/courses'
import type { ApiResponse } from '@/shared/api/type'
import type { Mode } from '../ui/type'

export type UserCourses = {
	userId: string
	courses: string[]
}

export type myCorsesStatus = 'idle' | 'success' | 'error' | 'loading'

export type State = {
	myCourses: CoursesType[]
	status: myCorsesStatus
	error: Error | null
}

type Success = {
	type: 'success'
	data: CoursesType[]
}

type Fail = {
	type: 'fail'
	error: Error
}

type Request = {
	type: 'request'
}

export type Action = Success | Fail | Request

export interface IMyCoursesServices {
	getCoursesByUser: (
		userId: string,
		options?: { mode?: Mode; signal?: AbortSignal }
	) => Promise<ApiResponse<string[]>>
	addCoursesStudent: (
		userId: string,
		coursesId: string
	) => Promise<ApiResponse<UserCourses>>
	removeCoursesStudent: (
		userId: string,
		coursesId: string
	) => Promise<ApiResponse<UserCourses>>
}
