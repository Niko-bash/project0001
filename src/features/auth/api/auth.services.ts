import type { AuthUser, CreateUser, User } from './type'

export const AuthServices = {
	getSessionCookie: () => {},
	setSessionCookie: () => {},
	getSession: () => {},
	SingUp: async (data: AuthUser): Promise<unknown> => {
		const response = await fetch(`/api/user?email=${data.email}`, {
			method: 'GET'
		})

		if (!response.ok) {
			console.error('BadRequest')
			return
		}

		const users: User[] = await response.json()
		const user = users[0]

		if (user?.email === data.email) {
			console.error('this user is already registered')
			return
		}

		const createDataUser: CreateUser = {
			...data,
			role: 'user',
			name: data.email
		}

		const createUser = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify(createDataUser)
		})

		if (!createUser.ok) {
			console.log('bad registr')
			return
		}

		const thisUser: User = await createUser.json()

		const { id, ...userData } = thisUser

		return {
			status: 200,
			success: true,
			data: userData
		}
	},
	SingIn: () => {},
	logout: () => {}
}
