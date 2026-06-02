import { CoursesPage } from '@/pages/courses.page'
import { createBrowserRouter } from 'react-router'
import { App } from '../App'

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
	}
])
