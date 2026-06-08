import { useContext } from 'react'
import { AuthContext } from './use-context'

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('context not in componentk')
	}
	return context
}
