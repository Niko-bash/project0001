import { AdminServices } from '@/features/admin/api/api'
import { BarPanel } from '@/features/admin/ui/bar-panel'
import type { PanelDataType } from '@/features/admin/ui/type'
import { useEffect, useRef, useState } from 'react'

type StateType = {
	users: PanelDataType[]
	courses: PanelDataType[]
}

export function AdminPanelPage() {
	const [data, setData] = useState<StateType>({ users: [], courses: [] })
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const abort = useRef<AbortController | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			abort.current?.abort()

			const controller = new AbortController()
			abort.current = controller

			try {
				const [usersResult, coursesResult] = await Promise.allSettled([
					AdminServices.getDashboardUsers(controller.signal),
					AdminServices.getDashboardCourses(controller.signal)
				])

				const users =
					usersResult.status === 'fulfilled' ? usersResult.value : []

				const courses =
					coursesResult.status === 'fulfilled' ? coursesResult.value : []

				setData({ users: users, courses: courses })
				return
			} catch (e) {
				setError(e instanceof Error ? e : new Error(String(e)))
				setData({ courses: [], users: [] })
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [setError])

	return (
		<div className="flex">
			<BarPanel data={data.users} />
			<BarPanel data={data.courses} />
		</div>
	)
}
