import type { ReactNode } from 'react'
import type { Permissions } from '../api/type'
import { useAccess } from '../model/useAccess'

export const Can = ({
	permission,
	fallback = null,
	children
}: {
	permission: Permissions
	fallback?: ReactNode
	children: ReactNode
}) => {
	const { hasPermission } = useAccess()

	const allowed = hasPermission(permission)

	return allowed ? <>{children}</> : <>{fallback}</>
}
