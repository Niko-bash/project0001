import { AuthServices } from '@/features/auth/api/auth.services'
import type { SessionUser } from '@/features/auth/api/type'
import { createBrowserRouter } from 'react-router'
import { App } from '../App'
import { AuthLayout } from '../layout'

export const router = createBrowserRouter([
	{
		path: '/',
		loader: async (): Promise<{
			session: SessionUser
		} | null> => {
			try {
				const session = await AuthServices.getSession()
				if (session) {
					return { session: session }
				}
				return null
			} catch (e) {
				console.error(e)
				return null
			}
		},
		Component: App,
		children: [
			// {
			// 	index: true,
			// 	lazy: async () =>
			// 		await import('../../pages/courses.page').then((m) => ({
			// 			Component: m.default
			// 		}))
			// }
			{
				index: true,
				lazy: async () => {
					const { default: Component } =
						await import('../../pages/courses.page')
					return { Component }
				},
				hydrateFallbackElement: <div>Загрузка...</div>
			}
		]
	},
	{
		path: 'auth',
		Component: AuthLayout,
		children: [
			// {
			// 	path: 'login',
			// 	Component: LoginPage
			// },
			// {
			// 	path: 'register',
			// 	Component: RegisterPage
			// }
			{
				path: 'login',
				lazy: async () => {
					const { default: Component } =
						await import('../../pages/login.page')
					return { Component }
				}
			},
			{
				path: 'register',
				lazy: async () => {
					const { default: Component } =
						await import('../../pages/register.page')
					return { Component }
				}
			}
		]
	}
])
