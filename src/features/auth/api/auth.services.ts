import type { AuthUser } from './type'

export const AuthServices = {
	getSessionCookie: () => {},
	setSessionCookie: () => {},
	getSession: () => {},
	SingUp: async (data: AuthUser): Promise<unknown> => {
		const user = await fetch('')
	},
	SingIn: () => {},
	logout: () => {}
}
