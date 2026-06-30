import type { UserCourses } from '../api/type'

export function isUserCoursesArray(data: unknown[]): data is UserCourses[] {
	if (data.length === 0) return false

	const firstItem = data[0]

	return (
		typeof firstItem === 'object' &&
		firstItem !== null &&
		'courses' in firstItem
	)
}
