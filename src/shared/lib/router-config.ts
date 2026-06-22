// export const ROUTER = {
// 	HOME: '/',
// 	PROFILE: '/profile/:id',
// 	MY_COURSES: '/myCourses/:id',
// 	AUTH: 'auth',
// 	LOGIN: 'login',
// 	REGISTER: 'register'
// } as const

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
	AUTH: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		REGISTER: '/auth/register'
	}
} as const
