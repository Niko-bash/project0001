import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { Button } from '@mui/material'

export const AddCourseButton = ({
	courseId,
	userId
}: {
	courseId: string
	userId: string
}) => {
	const handleAddingCourse = async (courseId: string, userId: string) => {
		const response = await myCoursesServices.addCourses(userId, courseId)
		if (response.success) {
			console.log('SUC')
		}
	}
	return (
		<Button
			variant="outlined"
			onClick={() => handleAddingCourse(courseId, userId)}
		>
			Add
		</Button>
	)
}
