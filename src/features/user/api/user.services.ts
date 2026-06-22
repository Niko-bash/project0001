import { AuthServices } from '@/features/auth/api/auth.services'
import type { ApiResponse } from '@/shared/api/type'
import type { ProfileUser } from './type'

export const UserServices = {
	async updateUserProfile(
		userData: ProfileUser,
		userId: string
	): Promise<ApiResponse<ProfileUser>> {
		const response = await fetch(`/api/user/${userId}`, {
			method: 'PATCH',
			body: JSON.stringify(userData)
		})

		if (!response.ok) {
			throw new Error()
		}

		const data: ProfileUser = await response.json()

		await AuthServices.setSessionCookie(data)

		return {
			success: true,
			status: 200,
			data
		}
	},

	async addCourses(
		courseId: string,
		userId: string
	): Promise<ApiResponse<ProfileUser>> {
		const responseCourse = await fetch(`/api/courses/${courseId}`, {
			method: 'GET'
		})

		if (!responseCourse.ok) {
			throw new Error('This course is no')
		}

		const course = await responseCourse.json()

		console.log(course)

		const responseUser = await fetch(`/api/user/${userId}`, {
			method: 'GET'
		})

		if (!responseUser.ok) {
			throw new Error('This user its no')
		}

		const dataUser: ProfileUser = await responseUser.json()

		const reqData = { ...dataUser, course: [...dataUser.course, course] }

		const request = await fetch(`/api/user/${userId}`, {
			method: 'PATCH',
			body: JSON.stringify(reqData)
		})

		if (!request.ok) {
			throw new Error('Error')
		}

		const res: ProfileUser = await request.json()
		await AuthServices.setSessionCookie(res)
		return {
			status: 200,
			success: true,
			data: res
		}
	}
}
