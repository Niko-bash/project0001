import type { CoursesType } from '@/features/courses/api/type'

export type UserCourses = {
	userId: string
	courses: CoursesType[]
}
