import { MyCoursesCard, MyCoursesList } from '@/features/my-courses'
import type { ProfileUser } from '@/features/user/api/type'
import { Container } from '@mui/material'
import { useLoaderData } from 'react-router'

export function MyCoursesPage() {
	const data: ProfileUser = useLoaderData()

	return (
		<Container>
			<MyCoursesList
				items={data.course}
				render={(item) => (
					<MyCoursesCard
						item={item}
						key={item.id}
					/>
				)}
			/>
		</Container>
	)
}
