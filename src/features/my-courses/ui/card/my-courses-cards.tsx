import type { CoursesType, CoursesType2 } from '@/features/courses'
import { Button } from '@mui/material'
import { CardStudent } from './student'
import { CardTeacher } from './teacher'

export const MyCoursesCards = ({
	userId,
	onOpen,
	item
}: {
	userId: string
	item: CoursesType | CoursesType2
	onOpen: (coursesId: string) => void
}) => {
	switch (item.mode) {
		case 'Student':
			return (
				<CardStudent
					userId={userId}
					actions={
						<Button onClick={() => onOpen(item.id)}>Unsubscribe</Button>
					}
					item={item}
				/>
			)
		case 'Teacher':
			return (
				<CardTeacher
					userId={userId}
					actions={<Button onClick={() => onOpen(item.id)}>Delete</Button>}
					item={item}
				/>
			)
	}
}
