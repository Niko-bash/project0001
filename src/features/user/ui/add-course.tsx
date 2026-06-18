import { Button } from '@mui/material'
import { UserServices } from '../api/user.services'

export const AddCourseButton = ({
	courseId,
	userId
}: {
	courseId: string
	userId: string
}) => {
	const handleAddingCourse = async (courseId: string, userId: string) => {
		const response = await UserServices.addCourses(courseId, userId)
		if (response.success) {
			console.log('SUC')
		}
	}
	return (
		userId && (
			<Button
				variant="outlined"
				onClick={() => handleAddingCourse(courseId, userId)}
			>
				Add
			</Button>
		)
	)
}
