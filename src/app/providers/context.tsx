import { type SessionUser } from '@/features/auth/api/type'
import { AuthContext } from '@/features/auth/model/use-context'
import { useState } from 'react'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<SessionUser | null>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
