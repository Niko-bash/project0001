import { AdminServices } from '@/features/admin/api/api'
import { BarPanel } from '@/features/admin/ui/bar-panel'
import type { PanelDataType } from '@/features/admin/ui/type'
import { useEffect, useRef, useState } from 'react'

type StateType = {
	users: PanelDataType[]
	courses: PanelDataType[]
}

type ErrorStateType = {
	users: Error | null
	courses: Error | null
}

export function AdminPanelPage() {
	const [data, setData] = useState<StateType>({ users: [], courses: [] })
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<ErrorStateType>({
		users: null,
		courses: null
	})
	const [generalError, setGeneralError] = useState<Error | null>(null)

	const abort = useRef<AbortController | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const controller = new AbortController()
			abort.current = controller

			setIsLoading(true)
			setError({ courses: null, users: null })
			setGeneralError(null)

			try {
				const [usersResult, coursesResult] = await Promise.allSettled([
					AdminServices.getDashboardUsers(controller.signal),
					AdminServices.getDashboardCourses(controller.signal)
				])

				if (controller.signal.aborted) return

				const usersError =
					usersResult.status === 'rejected' ? usersResult.reason : null

				const coursesError =
					coursesResult.status === 'rejected' ? coursesResult.reason : null

				if (usersError && coursesError) {
					setGeneralError(new Error('All errors'))
					setData({ users: [], courses: [] })
					setError({ users: null, courses: null })
					return
				}

				const users =
					usersResult.status === 'fulfilled' ? usersResult.value : []

				const courses =
					coursesResult.status === 'fulfilled' ? coursesResult.value : []

				setData({ users: users, courses: courses })
				setError({ users: usersError, courses: coursesError })
				return
			} catch (e) {
				setGeneralError(e instanceof Error ? e : new Error(String(e)))
				setError({ courses: null, users: null })
				setData({ courses: [], users: [] })
			} finally {
				if (!controller.signal.aborted) setIsLoading(false)
			}
		}

		fetchData()

		return () => abort.current?.abort()
	}, [])

	const isGeneral = generalError && !isLoading

	return (
		<div className="w-full min-h-[80vh] mt-3.5">
			{isLoading && <div>Loading</div>}
			{isGeneral && <div>error 123</div>}
			<div className="grid grid-cols-3 grid-rows-3 w-full min-h-[80vh] gap-4">
				<BarPanel
					data={data.users}
					error={error.users}
				/>
				<BarPanel
					data={data.courses}
					error={error.courses}
				/>
			</div>
		</div>
	)
}
