import { AuthServices } from '@/features/auth/api/auth.services'
import { CoursesServices } from '@/features/courses/api/courses.services'
import { myCoursesServices } from '@/features/my-courses/api/myCourses.services'
import { redirect } from 'react-router'

interface CoursesLoaderParams {
	params: {
		id?: string
		coursesId?: string
	}
	request: Request
}
export async function coursesLoader({ params, request }: CoursesLoaderParams) {
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

	const courseIs = await myCoursesServices.getCoursesByUser(user.id)

	if (!courseIs.success) {
		return redirect('/')
	}

	const hasAccess = courseIs.data.find((item) => item === params.coursesId)

	if (!hasAccess) {
		return redirect('/')
	}

	const courses = await CoursesServices.getOneCourses(params.coursesId)

	if (!courses.success) {
		return redirect('/')
	}

	return { user, courses: courses.data }
}
