import type { ApiResponse } from '@/shared/api/type'
import type { Mode } from '../ui/type'

export type UserCourses = {
	userId: string
	courses: string[]
}

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
