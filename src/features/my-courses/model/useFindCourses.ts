import type { CoursesType } from '@/features/courses/api/type'
import { useCallback, useEffect, useState } from 'react'
import type { IMyCoursesServices } from '../api/type'
import type { Mode } from '../ui/type'

const loadCourses = async (
	id: string,
	mode: Mode,
	myCoursesServices: IMyCoursesServices,
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

export const useCourses = (
	dataId: string,
	mode: Mode,
	services: IMyCoursesServices
) => {
	const [courses, setCourses] = useState<CoursesType[] | undefined>([])
	const [isLoading, setIsLoading] = useState(false)

	const fetchData = useCallback(
		async (signal?: AbortSignal) => {
			setIsLoading(true)
			try {
				const courses = await loadCourses(dataId, mode, services, signal)
				setCourses(courses)
				return courses
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError') {
					return
				}
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		},
		[dataId, mode]
	)

	useEffect(() => {
		const controller = new AbortController()
		const loadData = async () => {
			await fetchData(controller.signal)
		}

		loadData()

		return () => controller.abort()
	}, [fetchData])

	return {
		courses,
		isLoading,
		refetch: fetchData
	}
}
