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
		path: (studentId: string | number, coursesId: string | number) =>
			`/myCourses/student/${studentId}/courses/${coursesId}`
	},
	TEACHER_COURSES: {
		pattern: '/myCourses/teacher/:id/courses/:coursesId',
		path: (teacherId: string | number, coursesId: string | number) =>
			`/myCourses/teacher/${teacherId}/courses/${coursesId}`
	},
	TEACHER_STUDENT: {
		pattern: '/myCourses/teacher/:id/courses/:coursesId/student/:studentId',
		path: (
			teacherId: string | number,
			coursesId: string | number,
			studentId: string | number
		) =>
			`/myCourses/teacher/${teacherId}/courses/${coursesId}/student/${studentId}`
	},
	AUTH: { ROOT: '/auth', LOGIN: '/auth/login', REGISTER: '/auth/register' }
} as const
