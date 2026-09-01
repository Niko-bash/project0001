import type { User } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
import type { Homework } from '@/features/teacher'
import type { ApiResponse } from '@/shared/api/type'

export type StudentLoaderData = {
	user: User
	data: CoursesType
}

export interface IStudentServices {
	updateTasks: (
		body: Homework,
		studentId: string
	) => Promise<ApiResponse<Homework[]>>
}
