import { CoursesPage } from '@/pages/courses.page'
import { LoginPage } from '@/pages/login.page'
import { RegisterPage } from '@/pages/register.page'
import { createBrowserRouter } from 'react-router'
import { App } from '../App'
import { AuthLayout } from '../layout'

export const router = createBrowserRouter([
	{
		path: '/',
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
