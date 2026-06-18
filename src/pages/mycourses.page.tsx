import { MyCoursesCard } from '@/features/my-courses/ui/courses-card'
import { MyCoursesList } from '@/features/my-courses/ui/courses-list'
import type { ProfileUser } from '@/features/user/api/type'
import { Container } from '@mui/material'
import { useLoaderData } from 'react-router'

const MyCoursesPage = () => {
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

export default MyCoursesPage
