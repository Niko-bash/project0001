import { AuthServices } from '@/features/auth/api/auth.services'
import { CoursesServices } from '@/features/courses/api/courses.services'
import { redirect } from 'react-router'

interface TeacherLoaderParams {
	params: {
		id?: string
		coursesId?: string
	}
	request: Request
}

export async function teacherLoader({ params, request }: TeacherLoaderParams) {
	if (!params.id || !params.coursesId) {
		throw new Response('Missing required parameters', { status: 400 })
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
		return redirect('/')
	}

	const hasAccess = courses.data.creatorId === user.id

	if (!hasAccess) {
		return redirect('/')
	}

	return { user, data: courses.data }
}
