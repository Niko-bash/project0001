import { AuthServices } from '@/features/auth/api/auth.services'
import type { ApiResponse } from '@/shared/api/type'
import type { IUserServices, ProfileUser } from './type'

export const UserServices: IUserServices = {
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
	}
}
