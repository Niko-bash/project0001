import type { User } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'

export type StudentLoaderData = {
	user: User
	data: CoursesType
}
