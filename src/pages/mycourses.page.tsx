import type { SessionUser } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
import { MyCoursesCard, MyCoursesList } from '@/features/my-courses'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

export function MyCoursesPage() {
	const data: SessionUser = useLoaderData()

	const [courses, setCourses] = useState<CoursesType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await myCoursesServices.getCoursesByUser(data.id, {
					signal: controller.signal
				})

				if (response.success) {
					setCourses(response.data)
				}
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError') {
					return
				}
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()

		return () => controller.abort()
	}, [data.id])

	return (
		<Container>
			<MyCoursesList
				isLoading={isLoading}
				items={courses}
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
