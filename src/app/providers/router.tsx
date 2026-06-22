import { ROUTES } from '@/shared/lib/router-config'
import { createBrowserRouter, type RouteObject } from 'react-router'
import { App } from '../App'
import { AuthLayout } from '../layout'
import { protectedLoader } from './loaders/protected'
import { rootLoader } from './loaders/root'

const routes: RouteObject[] = [
	{
		path: ROUTES.HOME,
		loader: rootLoader,
		Component: App,
		children: [
			{
				index: true,
				lazy: () =>
					import('@/pages/courses.page').then(({ CoursesPage }) => ({
						Component: CoursesPage
					}))
			},
			{
				path: ROUTES.PROFILE.pattern,
				loader: protectedLoader,
				lazy: () =>
					import('@/pages/profile.page').then(({ ProfilePage }) => ({
						Component: ProfilePage
					}))
			},
			{
				path: ROUTES.MY_COURSES.pattern,
				loader: protectedLoader,
				lazy: () =>
					import('@/pages/mycourses.page').then(({ MyCoursesPage }) => ({
						Component: MyCoursesPage
					}))
			}
		]
	},
	{
		path: ROUTES.AUTH.ROOT,
		Component: AuthLayout,
		children: [
			{
				path: ROUTES.AUTH.LOGIN,
				lazy: () =>
					import('@/pages/login.page').then(({ LoginPage }) => ({
						Component: LoginPage
					}))
			},
			{
				path: ROUTES.AUTH.REGISTER,
				lazy: () =>
					import('@/pages/register.page').then(({ RegisterPage }) => ({
						Component: RegisterPage
					}))
			}
		]
	}
]

export const router = createBrowserRouter(routes)
