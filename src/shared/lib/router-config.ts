// shared/constants/routes.ts
//!TODO: rework use flow role
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
	STUDENT_COURSES: {
		pattern: '/myCourses/student/:id/courses/:coursesId',
		path: (userId: string | number, coursesId: string | number) =>
			`/myCourses/student/${userId}/courses/${coursesId}`
	},
	TEACHER_COURSES: {
		pattern: '/myCourses/teacher/:id/courses/:coursesId',
		path: (teacherId: string | number, coursesId: string | number) =>
			`/myCourses/teacher/${teacherId}/courses/${coursesId}`
	},
	AUTH: { ROOT: '/auth', LOGIN: '/auth/login', REGISTER: '/auth/register' }
} as const
