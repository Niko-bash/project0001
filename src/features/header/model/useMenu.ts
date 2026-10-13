import { useAccess } from '@/features/auth/model/useAccess'
import type { MenuType } from '@/shared/ui/account-menu'

export const useMenu = (menu: MenuType[]) => {
	const { hasPermission, user, setUser } = useAccess()

	const items = menu.filter((item) =>
		item.permission ? hasPermission(item.permission) : true
	)

	return { items, user, setUser }
}
