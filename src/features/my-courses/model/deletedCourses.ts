import { CoursesServices } from '@/features/courses/api/courses.services'
import { myCoursesServices } from '../api/myCourses.services'
import type { Mode } from '../ui/type'

const services: Record<
	Mode,
	(userId: string, coursesId: string) => Promise<{ success: boolean }>
> = {
	Student: myCoursesServices.removeCoursesStudent,
	Teacher: CoursesServices.deletedCoursesTeacher
}

export const useCoursesDeletion = (userId: string, mode: Mode) => {
	const deleted = async (coursesId: string) => {
		try {
			const service = services[mode]

			const response = await service(userId, coursesId)

			if (!response.success) {
				throw new Error('deleted is fail')
			}

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}

	return { deleted }
}
