import { createContext } from 'react'
import type { SessionUser } from '../api/type'

type AuthContextType = {
	user: SessionUser | null
	setUser: (user: SessionUser | null) => void
}
export const AuthContext = createContext<AuthContextType | null>(null)
