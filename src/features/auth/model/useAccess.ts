import type { Permissions, Role } from '../api/type'
import { useAuth } from './useAuth'

export const useAccess = () => {
	const { user, setUser } = useAuth()

	const hasPermission = (permission: Permissions) =>
		user?.permissions.includes(permission) ?? false

	const hasRole = (role: Role) => user?.role.includes(role) ?? false

	return { user, setUser, hasPermission, hasRole }
}
