import type { ReactNode } from 'react'
import type { Role } from '../api/type'
import { useAccess } from '../model/useAccess'

export const RequiredRole = ({
	role,
	fallback = null,
	children
}: {
	role: Role | Role[]
	fallback: ReactNode
	children: ReactNode
}) => {
	const { hasRole } = useAccess()

	const allowed = Array.isArray(role) ? role.some(hasRole) : hasRole(role)

	return allowed ? <>{children}</> : <>{fallback}</>
}
