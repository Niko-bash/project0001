import { useAuth } from '@/features/auth'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { useEffect, useState } from 'react'

//!Временно
export const useUserData = () => {
	const { user } = useAuth()

	const [adding, setAdding] = useState<Set<string>>(new Set())

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			if (!user?.id) return

			try {
				const response = await myCoursesServices.getCoursesByUser(user.id, {
					signal: controller.signal
				})

				if (response.success) {
					setAdding(new Set(response.data.map((item) => item.id) || []))
				}
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError') {
					return
				}
				console.error(error)
			}
		}

		fetchData()
		return () => controller.abort()
	}, [user?.id])

	return {
		user,
		adding
	}
}
