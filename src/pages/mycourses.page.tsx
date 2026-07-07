import type { SessionUser } from '@/features/auth/api/type'
import { MyCoursesList } from '@/features/my-courses'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { CardFactory } from '@/features/my-courses/ui/card/wrapper'
import type { MapCardsKey, MapCardType } from '@/features/my-courses/ui/type'
import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

export function MyCoursesPage() {
	const data = useLoaderData<SessionUser>()

	const [courses, setCourses] = useState<MapCardType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const [mode, setMode] = useState<MapCardsKey>('Student')

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: MapCardsKey
	) => {
		console.log(event)
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
		<>
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
					<CardFactory
						item={item}
						mode={mode}
					/>
				)}
			/>
		</>
	)
}
