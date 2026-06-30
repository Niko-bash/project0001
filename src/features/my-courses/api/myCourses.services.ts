import type { CoursesType } from '@/features/courses/api/type'
import type { MyCoursesMode } from '@/pages/mycourses.page'
import { RegistrationError, type ApiResponse } from '@/shared/api/type'
import { isUserCoursesArray } from '../lib/isUserCoursesArray'
import type { UserCourses } from './type'

export const myCoursesServices = {
	async getCoursesByUser(
		userId: string,
		options?: { mode?: MyCoursesMode; signal?: AbortSignal }
	): Promise<ApiResponse<CoursesType[]>> {
		const mode = options?.mode ?? 'Student'

		const pathMode: Record<MyCoursesMode, string> = {
			Student: `/api/userCourses?userId=${userId}`,
			Teacher: `/api/courses?creatorId=${userId}`
		}

		const response = await fetch(`${pathMode[mode]}`, {
			method: 'GET',
			signal: options?.signal
		})

		if (!response.ok) {
			throw new Error('this user has no added courses')
		}

		const result: UserCourses[] | CoursesType[] = await response.json()

		let data

		if (isUserCoursesArray(result)) {
			data = result[0].courses
		} else {
			data = result
		}

		return {
			status: 200,
			success: true,
			data: data
		}
	},
	async addCoursesStudent(
		userId: string,
		coursesId: string
	): Promise<ApiResponse<UserCourses>> {
		// Search and check user in BD
		const user = await fetch(`/api/userCourses?userId=${userId}`, {
			method: 'GET'
		})
		if (!user.ok) {
			new RegistrationError()
		}

		const thisUser: (UserCourses & { id: string })[] = await user.json()

		// Check courses in BD
		const coursesFetch = await fetch(`/api/courses/${coursesId}`, {
			method: 'GET'
		})

		if (!coursesFetch.ok) {
			throw new Error('This courses is not defined')
		}

		const courses: CoursesType = await coursesFetch.json()
		// Check courses in user-courses
		const thisCourses = thisUser[0].courses ?? []
		const check = thisCourses.some((item) => item.id === courses.id)

		if (check) {
			throw new Error('This courses already added')
		}

		const updateCourses = [...thisCourses, courses]

		const id = thisUser[0].id
		// Patch user
		const response = await fetch(`/api/userCourses/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId: userId, courses: updateCourses })
		})

		if (!response.ok) {
			throw new Error('courses is not added')
		}

		const result = await response.json()
		return {
			status: 200,
			success: true,
			data: result
		}
	}
}
