import { useAuth } from '@/features/auth/model/use-auth'
import { Button } from '@mui/material'
import { UserServices } from '../api/user.sevices'

export const AddCourseButton = ({ courseId }: { courseId: string }) => {
	const { user } = useAuth()
	const handleAddingCourse = async (courseId: string, userId: string) => {
		const response = await UserServices.AddCourses(courseId, userId)
		if (response.success) {
			console.log('SUC')
		}
	}
	return (
		user && (
			<Button
				variant="outlined"
				onClick={() => handleAddingCourse(courseId, user.id)}
			>
				Add
			</Button>
		)
	)
}
