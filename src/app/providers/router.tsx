import { AuthServices } from '@/features/auth/api/auth.services'
import type { SessionUser } from '@/features/auth/api/type'
import { createBrowserRouter, redirect } from 'react-router'
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
			{
				index: true,
				lazy: async () => {
					const { default: Component } =
						await import('../../pages/courses.page')
					return { Component }
				}
			},
			{
				path: '/profile/:id',
				loader: async ({ params }): Promise<SessionUser | Response> => {
					const user = await AuthServices.getSession()
					if (!user) {
						return redirect('/')
					}
					console.log(user.id)
					console.log(params.id)
					if (user.id !== params.id) {
						return redirect(`/profile/${user.id}`)
					}
					return user
				},
				lazy: async () => {
					const { default: Component } =
						await import('../../pages/profile.page')
					return { Component }
				}
			}
		]
	},
	{
		path: 'auth',
		Component: AuthLayout,
		children: [
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
