// shared/constants/routes.ts
export const ROUTES = {
	HOME: '/',
	PROFILE: {
		pattern: '/profile/:id',
		path: (id: string | number) => `/profile/${id}`
	},
	MY_COURSES: {
		pattern: '/myCourses/:id',
		path: (id: string | number) => `/myCourses/${id}`
	},
	CREATE_COURSES: {
		pattern: '/myCourses/:id/create-courses',
		path: (id: string | number) => `/myCourses/${id}/create-courses`
	},
	MAIN_COURSES: {
		pattern: '/myCourses/:id/courses/:coursesId',
		path: (coursesId: string | number) =>
			`/myCourses/:id/courses/${coursesId}`
	},
	AUTH: { ROOT: '/auth', LOGIN: '/auth/login', REGISTER: '/auth/register' }
} as const
