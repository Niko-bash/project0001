import { useAuth } from '@/features/auth'
import { useMemo } from 'react'

//!Временно
export const useUserData = () => {
	const { user } = useAuth()

	const userCoursesIds = useMemo(() => {
		if (!user?.course) return new Set([])
		return new Set(user.course.map((item) => item.id))
	}, [user])

	return {
		user,
		userCoursesIds
	}
}
