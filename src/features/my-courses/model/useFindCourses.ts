import type { CoursesType } from '@/features/courses/api/type'
import { useCallback, useEffect, useReducer, useRef } from 'react'
import type { Action, IMyCoursesServices, State } from '../api/type'
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

	if (!response.success) {
		throw new Error('Failed')
	}

	const uniqueIds = [...new Set(response.data.flat())]

	const results = await Promise.allSettled(
		uniqueIds.map(async (coursesId) => {
			const res = await fetch(`/api/courses/${coursesId}`, { signal })
			if (!res.ok) throw new Error(`Courses ${coursesId}, ${res.status}`)
			return (await res.json()) as CoursesType
		})
	)

	const courses: CoursesType[] = []
	const failed: string[] = []

	results.forEach((r, i) => {
		if (r.status === 'fulfilled') courses.push(r.value)
		else if (r.reason?.name !== 'AbortError') failed.push(uniqueIds[i])
	})
	if (failed.length) console.warn(`Failed ${failed}`)
	return courses
}

const INITIAL: State = {
	myCourses: [],
	error: null,
	status: 'idle'
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'request':
			return {
				...state,
				error: null,
				status: 'loading',
				myCourses: []
			}
		case 'success':
			return {
				...state,
				error: null,
				myCourses: action.data,
				status: 'success'
			}
		case 'fail':
			return {
				...state,
				error: action.error,
				status: 'error'
			}
		default:
			return state
	}
}

export const useCourses = (
	userId: string,
	mode: Mode,
	services: IMyCoursesServices
) => {
	const [state, dispatch] = useReducer(reducer, INITIAL)

	const abortRef = useRef<AbortController | null>(null)

	const fetchData = useCallback(async () => {
		abortRef.current?.abort()
		const controller = new AbortController()
		abortRef.current = controller

		dispatch({ type: 'request' })

		try {
			const courses = await loadCourses(
				userId,
				mode,
				services,
				controller.signal
			)
			dispatch({ type: 'success', data: courses })

			return courses
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return
			}
			dispatch({
				type: 'fail',
				error: error instanceof Error ? error : new Error(String(error))
			})
		} finally {
			if (abortRef.current === controller) {
				abortRef.current = null
			}
		}
	}, [userId, mode, services])

	useEffect(() => {
		fetchData()

		return () => {
			abortRef.current?.abort()
		}
	}, [fetchData])

	return {
		courses: state.myCourses,
		status: state.status,
		refetch: fetchData
	}
}
