import { AuthServices } from '@/features/auth/api/auth.services'
import { CoursesServices } from '@/features/courses/api/courses.services'
import { redirect } from 'react-router'

interface StudentLoaderParams {
	params: {
		id?: string
		coursesId?: string
	}
	request: Request
}
export async function studentLoader({ params, request }: StudentLoaderParams) {
	if (!params.id || !params.coursesId) {
		throw new Error('Missing params ')
	}

	const user = await AuthServices.getSession()

	if (!user) {
		return redirect('/auth/login')
	}

	if (user.id !== params.id) {
		const url = new URL(request.url)
		const pathname = url.pathname
		return redirect(pathname.replace(params.id!, user.id))
	}

	const courses = await CoursesServices.getOneCourses(params.coursesId)

	if (!courses.success) {
		redirect('/')
		throw new Error('This courses is not ')
	}

	return {
		user,
		data: courses.data
	}
}
