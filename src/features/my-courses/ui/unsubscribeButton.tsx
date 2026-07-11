import { Button } from '@mui/material'
import { useRemoveCoursesStudent } from '../model/removeCoursesStudent'

export const UnsubscribeButton = ({
	title,
	userId,
	coursesId
}: {
	title: React.ReactNode
	userId: string
	coursesId: string
}) => {
	const { handleDeleted } = useRemoveCoursesStudent()
	return (
		<Button onClick={() => handleDeleted(userId, coursesId)}>{title}</Button>
	)
}
