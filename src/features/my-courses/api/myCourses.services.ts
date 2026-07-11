import type { CoursesType } from '@/features/courses/api/type'
import { RegistrationError, type ApiResponse } from '@/shared/api/type'
import { isUserCoursesArray } from '../lib/isUserCoursesArray'
import type { MapCardsKey } from '../ui/type'
import type { UserCourses } from './type'

export const myCoursesServices = {
	async getCoursesByUser(
		userId: string,
		options?: { mode?: MapCardsKey; signal?: AbortSignal }
	): Promise<ApiResponse<CoursesType[]>> {
		const mode = options?.mode ?? 'Student'

		const pathMode: Record<MapCardsKey, string> = {
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
	},
	async removeCoursesStudent(
		userId: string,
		coursesId: string
	): Promise<ApiResponse<UserCourses>> {
		const response = await fetch(`/api/userCourses?userId=${userId}`, {
			method: 'GET'
		})

		if (!response.ok) {
			throw new Error('user is not get')
		}

		const oldData: (UserCourses & { id: string })[] = await response.json()

		const user = oldData[0]

		const updateData = user.courses
			? user.courses.filter((item) => item.id !== coursesId)
			: []

		const newData: UserCourses & { id: string } = {
			userId,
			courses: [...updateData],
			id: user.id
		}

		const newResponse = await fetch(`/api/userCourses/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newData)
		})

		if (!newResponse.ok) {
			throw new Error('update is not success')
		}

		const data = await newResponse.json()

		return {
			status: 200,
			success: true,
			data
		}
	}
}
