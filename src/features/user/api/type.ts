import type { User } from '@/features/auth/api/type'
import type { ApiResponse } from '@/shared/api/type'

export type ProfileUser = Omit<User, 'password' | 'id' | 'role'>

export interface IUserServices {
	updateUserProfile: (
		userData: ProfileUser,
		userId: string
	) => Promise<ApiResponse<ProfileUser>>
}
