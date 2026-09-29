import { useCallback, useEffect, useReducer, useRef } from 'react'
import type {
	ActionStudents,
	InfinityStudentsTableDataAdapter,
	ITeacherServices,
	StateStudents,
	UserTableData
} from '../api/type'

const EMPTY: InfinityStudentsTableDataAdapter<UserTableData> = {
	data: [],
	first: 0,
	prev: null,
	next: null,
	last: 0,
	pages: 0,
	items: 0
} as const

const INITIAL: StateStudents = {
	students: EMPTY,
	error: null,
	page: 1,
	status: 'idle'
}
function reducer(state: StateStudents, action: ActionStudents): StateStudents {
	switch (action.type) {
		case 'request':
			return {
				...state,
				status: 'loading',
				error: null
			}

		case 'success':
			return {
				...state,
				status: 'success',
				page: action.page,
				students: action.students
			}

		case 'fail':
			return {
				...state,
				status: 'error',
				error: action.error,
				page: action.page
			}

		case 'reset':
			return INITIAL

		default:
			return state
	}
}

export const useStudents = (
	dataId: string,
	TeacherServices: ITeacherServices
) => {
	const [state, dispatch] = useReducer(reducer, INITIAL)

	const abortRef = useRef<AbortController | null>(null)

	const fetchUsers = useCallback(
		async (page: number) => {
			abortRef.current?.abort()

			const controller = new AbortController()

			abortRef.current = controller

			dispatch({ type: 'request' })

			try {
				const usersPaginate =
					await TeacherServices.getAllStudentsPagination(
						dataId,
						page,
						4,
						controller.signal
					)

				if (!usersPaginate.success) {
					throw new Error('bad request')
				}
				if (controller.signal.aborted) return
				dispatch({ type: 'success', page, students: usersPaginate.data })
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError')
					return
				if (controller.signal.aborted) return

				dispatch({
					type: 'fail',
					error: error instanceof Error ? error : new Error(String(error)),
					page
				})
			} finally {
				if (abortRef.current === controller) {
					abortRef.current = null
				}
			}
		},
		[TeacherServices, dataId]
	)

	useEffect(() => {
		fetchUsers(1)
	}, [fetchUsers])

	const { page } = state

	const handleNextPage = () => {
		fetchUsers(page + 1)
	}

	const handlePrevPage = () => {
		fetchUsers(page - 1)
	}

	return {
		students: state.students,
		status: state.status,
		onNextPage: handleNextPage,
		onPrevPage: handlePrevPage,
		error: state.error
	}
}
