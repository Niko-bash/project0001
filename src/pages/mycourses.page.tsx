import type { SessionUser } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
import { MyCoursesCard, MyCoursesList } from '@/features/my-courses'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { Container, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

export type MyCoursesMode = 'Teacher' | 'Student'

export function MyCoursesPage() {
	const data: SessionUser = useLoaderData()

	const [courses, setCourses] = useState<CoursesType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const [mode, setMode] = useState<MyCoursesMode>('Student')

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: MyCoursesMode
	) => {
		setMode(newValue)
	}

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await myCoursesServices.getCoursesByUser(data.id, {
					mode,
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
	}, [data.id, mode])

	return (
		<Container>
			<Tabs
				value={mode}
				onChange={handleChange}
				aria-label="wrapped label tabs example"
				variant="fullWidth"
			>
				<Tab
					value="Student"
					label="Student"
					disabled={isLoading}
				/>
				<Tab
					value="Teacher"
					label="Teacher"
					disabled={isLoading}
				/>
			</Tabs>
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
