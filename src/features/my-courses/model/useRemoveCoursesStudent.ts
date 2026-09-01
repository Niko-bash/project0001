import { myCoursesServices } from '../api/myCourses.services'

export const useRemoveCoursesStudent = () => {
	const handleDeleted = async (userId: string, coursesId: string) => {
		const response = await myCoursesServices.removeCoursesStudent(
			userId,
			coursesId
		)

		if (response.success) {
			console.log('Suc')
		}
	}

	return { handleDeleted }
}
