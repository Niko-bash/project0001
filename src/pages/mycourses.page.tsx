import type { SessionUser } from '@/features/auth/api/type'
import { CoursesServices } from '@/features/courses/api/courses.services'
import type { CoursesType } from '@/features/courses/api/type'
import { ModalConfirm, MyCoursesList } from '@/features/my-courses'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { CardFactory } from '@/features/my-courses/ui/card/factory'
import { ROUTES } from '@/shared/lib/router-config'
import { Button, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router'

const loadCourses = async (
	id: string,
	mode: 'Teacher' | 'Student',
	signal?: AbortSignal
) => {
	const response = await myCoursesServices.getCoursesByUser(id, {
		mode,
		signal: signal
	})

	if (!response.success) return

	const promises = response.data.map((ids) => fetch(`/api/courses/${ids}`))

	const result: CoursesType[] = await Promise.all(promises)
		.then((responses) => responses.filter((item) => item.ok))
		.then((responses) => Promise.all(responses.map((i) => i.json())))
	return result
}

export function MyCoursesPage() {
	const data = useLoaderData<SessionUser>()

	const [courses, setCourses] = useState<CoursesType[] | undefined>([])
	const [isLoading, setIsLoading] = useState(false)
	const [mode, setMode] = useState<'Student' | 'Teacher'>('Student')
	const [open, setOpen] = useState(false)
	const [selectedId, setSelectedId] = useState<{ id: string } | null>(null)

	const handleClickOpen = (coursesId: string) => {
		setSelectedId({ id: coursesId })
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setSelectedId(null)
	}

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: 'Student' | 'Teacher'
	) => {
		// console.log(event)
		setMode(newValue)
	}

	const refetch = async () => {
		setCourses(await loadCourses(data.id, mode))
	}

	useEffect(() => {
		const controller = new AbortController()
		const fetchData = async (signal?: AbortSignal) => {
			setIsLoading(true)
			try {
				const courses = await loadCourses(data.id, mode, signal)
				setCourses(courses)
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError') {
					return
				}
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData(controller.signal)

		return () => controller.abort()
	}, [data.id, mode])

	const handleDelete = async () => {
		if (!selectedId) return

		const services = {
			Student: myCoursesServices.removeCoursesStudent,
			Teacher: CoursesServices.deletedCoursesTeacher
		}

		const service = services[mode]

		const response = await service(data.id, selectedId.id)

		if (response.success) {
			handleClose()
			refetch()
		}
	}
	return (
		<>
			<Tabs
				value={mode}
				onChange={handleChange}
				aria-label="wrapped label tabs example"
				variant="fullWidth"
				className="pb-2"
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
			<Button
				className="w-full h-32"
				variant="contained"
				component={Link}
				to={ROUTES.CREATE_COURSES.pattern}
			>
				Create Courses
			</Button>
			<MyCoursesList
				isLoading={isLoading}
				items={courses}
				render={(item) => (
					<CardFactory
						key={item.id}
						item={item}
						mode={mode}
						extra={{
							userId: data.id,
							open,
							handleClick: () => console.log('123'),
							handleClickOpen
						}}
					/>
				)}
			/>
			<ModalConfirm
				mode={mode}
				onClose={handleClose}
				open={open}
				onConfirmDelete={handleDelete}
			/>
		</>
	)
}
