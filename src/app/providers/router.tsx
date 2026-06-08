import { AuthServices } from '@/features/auth/api/auth.services'
import type { SessionUser } from '@/features/auth/api/type'
import { CoursesPage } from '@/pages/courses.page'
import { LoginPage } from '@/pages/login.page'
import { RegisterPage } from '@/pages/register.page'
import { createBrowserRouter } from 'react-router'
import { App } from '../App'
import { AuthLayout } from '../layout'

export const router = createBrowserRouter([
	{
		path: '/',
		loader: async (): Promise<
			| {
					session: SessionUser
			  }
			| undefined
		> => {
			try {
				const session = await AuthServices.getSession()
				if (session) {
					return { session: session }
				}
			} catch (e) {
				console.error(e)
				return undefined
			}
		},
		Component: App,
		children: [
			{
				index: true,
				Component: CoursesPage
			}
		]
	},
	{
		path: 'auth',
		Component: AuthLayout,
		children: [
			{
				path: 'login',
				Component: LoginPage
			},
			{
				path: 'register',
				Component: RegisterPage
			}
		]
	}
])
