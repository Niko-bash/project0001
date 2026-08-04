import type { User } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
import { useLoaderData } from 'react-router'

type TeacherLoaderData = {
	user: User
	data: CoursesType
}
export function TeacherPage() {
	const data = useLoaderData<TeacherLoaderData>()
	return <div>Teacher Page</div>
}
