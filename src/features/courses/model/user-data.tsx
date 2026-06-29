import { useAuth } from '@/features/auth'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { useEffect, useState } from 'react'

//!Временно
export const useUserData = () => {
	const { user } = useAuth()

	const [state, setState] = useState<Set<string>>(new Set())

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			if (!user?.id) return

			const response = await myCoursesServices.getCoursesByUser(user.id, {
				signal: controller.signal
			})

			if (response.success) {
				setState(new Set(response.data.map((item) => item.id) || []))
			}
		}

		fetchData()
		return () => controller.abort()
	}, [user?.id])

	return {
		user,
		state
	}
}
