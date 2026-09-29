import { useCallback, useEffect, useReducer, useRef } from 'react'
import type {
	ActionHomework,
	ITeacherServices,
	StateHomework
} from '../api/type'

const INITIAL: StateHomework = {
	homework: [],
	error: null,
	status: 'idle'
}

function reducer(state: StateHomework, action: ActionHomework): StateHomework {
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
				homework: action.homework,
				status: 'success',
				error: null
			}
		case 'fail':
			return {
				...state,
				status: 'error',
				error: action.error
			}
		case 'reset':
			return INITIAL
		default:
			return state
	}
}

export const useHomework = (
	studentId: string,
	TeacherServices: ITeacherServices
) => {
	const [state, dispatch] = useReducer(reducer, INITIAL)
	const abortRef = useRef<AbortController | null>(null)

	const fetchHomeWork = useCallback(
		async (studentId: string) => {
			abortRef.current?.abort()

			const controller = new AbortController()

			abortRef.current = controller

			dispatch({ type: 'request' })

			try {
				const homework = await TeacherServices.getStudentHomeWork(
					studentId,
					controller.signal
				)

				if (!homework.success) {
					throw new Error('Homework students is error')
				}

				if (controller.signal.aborted) return

				dispatch({ type: 'success', homework: homework.data })
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError')
					return
				if (controller.signal.aborted) return

				dispatch({
					type: 'fail',
					error: error instanceof Error ? error : new Error(String(error))
				})
			} finally {
				if (abortRef.current === controller) {
					abortRef.current = null
				}
			}
		},
		[TeacherServices]
	)

	useEffect(() => {
		fetchHomeWork(studentId)
	}, [studentId, TeacherServices, fetchHomeWork])

	const refetch = useCallback(() => {
		fetchHomeWork(studentId)
	}, [fetchHomeWork, studentId])

	return {
		homeWork: state.homework,
		status: state.status,
		error: state.error,
		refetch
	}
}
