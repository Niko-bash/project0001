import { useCallback, useEffect, useReducer, useRef } from 'react'
import type { Action, ICoursesServices, SearchType, State } from '..'
import type { InfinityCoursesType } from '../ui/card'

const EMPTY: InfinityCoursesType = {
	data: [],
	first: 0,
	prev: null,
	next: null,
	last: 0,
	pages: 0,
	items: 0
} as const

const INITIAL: State = {
	courses: EMPTY,
	status: 'idle',
	error: null,
	page: 1,
	query: {}
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'request':
			return {
				...state,
				status: action.append ? 'loadingMore' : 'loading',
				error: null,
				query: action.query,
				page: action.page,
				courses: action.append ? state.courses : EMPTY
			}
		case 'success':
			if (action.page !== state.page) return state
			return {
				...state,
				status: 'success',
				courses:
					action.page === 1
						? action.data
						: {
								...action.data,
								data: [...state.courses.data, ...action.data.data]
							},
				error: null
			}
		case 'fail':
			if (action.page !== state.page) return state
			return {
				...state,
				status: action.append ? 'errorMore' : 'error',
				error: action.error
			}
		case 'reset':
			return INITIAL

		default:
			return state
	}
}

export const useInfinityScroll = (
	values: SearchType,
	CoursesServices: ICoursesServices
) => {
	const [state, dispatch] = useReducer(reducer, INITIAL)

	const abortRef = useRef<AbortController | null>(null)

	useEffect(() => {
		return () => {
			abortRef.current?.abort()
			abortRef.current = null
		}
	}, [])

	const run = useCallback(
		async (q: SearchType, page: number, append: boolean) => {
			abortRef.current?.abort()
			const controller = new AbortController()
			abortRef.current = controller

			dispatch({ type: 'request', query: q, page, append })

			try {
				const data = await CoursesServices.getInfinityCourses(
					q,
					page,
					controller.signal
				)
				if (controller.signal.aborted) return
				dispatch({ type: 'success', data, page, append })
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError')
					return
				if (controller.signal.aborted) return
				dispatch({
					type: 'fail',
					error: error instanceof Error ? error : new Error(String(error)),
					append,
					page
				})
			} finally {
				if (abortRef.current === controller) {
					abortRef.current = null
				}
			}
		},
		[CoursesServices]
	)

	useEffect(() => {
		run(values, 1, false)
	}, [values, run])

	const { status, page, query } = state

	const loadMore = useCallback(() => {
		if (
			status === 'loading' ||
			status === 'loadingMore' ||
			status === 'errorMore'
		)
			return
		run(query, page + 1, true)
	}, [run, status, page, query])

	const retry = useCallback(() => {
		if (status === 'errorMore') {
			run(query, page, true)
			return
		}
		if (status === 'error') {
			run(query, 1, false)
		}
	}, [run, status, page, query])

	return {
		courses: state.courses,
		status: state.status,
		error: state.error,
		loadMore,
		retry,
		hasData: state.courses.data.length > 0
	}
}
