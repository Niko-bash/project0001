import type { Permissions } from '@/features/auth'
import { AuthServices } from '@/features/auth/api/auth.services'
import { redirect } from 'react-router'

export function requiredPermissions(permission: Permissions) {
	return async () => {
		const user = await AuthServices.getSession()

		if (!user) {
			throw redirect('/')
		}

		if (!user.permissions.includes(permission)) {
			throw redirect('/error')
		}

		return null
	}
}
