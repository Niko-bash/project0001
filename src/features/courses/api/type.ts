import type { ApiResponse } from '@/shared/api/type'
import type { InfinityCoursesType } from '../ui/card'

type CommentCoursesType = {
	username: string
	rating: number
	comment: string
}
export type CoursesType = {
	mode: 'Student'
	id: string
	name: string
	description: string
	img: string
	rating: string
	creatorId: string
	reviews: CommentCoursesType[]
	video: string
}

export type CoursesType2 = {
	mode: 'Teacher'
	id: string
	name: string
	description: string
	img: string
	rating: string
	creatorId: string
	reviews: CommentCoursesType[]
	video: string
}

export type CreateCoursesType = Pick<
	CoursesType,
	'name' | 'description' | 'img'
> & { video: VideoType }
export type VideoType = {
	id?: string
	url: string
	description: string
}
export type SearchType = {
	title?: string
	sort?: '-rating' | 'rating'
	per_page?: string
}
export type CoursesStatus =
	| 'idle' // ничего не запрашивали
	| 'loading' // первая загрузка (данных ещё нет)
	| 'loadingMore' // дозагрузка (данные уже есть)
	| 'success' // загружено (может быть пусто — это тоже success)
	| 'error' // ошибка, данных нет
	| 'errorMore' // ошибка при дозагрузке, но старые данные есть

export type State = {
	courses: InfinityCoursesType
	status: CoursesStatus
	error: Error | null
	page: number
	query: SearchType
}

type Request = {
	type: 'request'
	query: SearchType
	page: number
	append: boolean
}

type Success = {
	type: 'success'
	data: InfinityCoursesType
	page: number
	append: boolean
}

type Fail = {
	type: 'fail'
	error: Error
	append: boolean
	page: number
}

type Reset = {
	type: 'reset'
}

export type Action = Request | Success | Fail | Reset

export interface ICoursesServices {
	getInfinityCourses: (
		query: SearchType,
		page: number,
		signal?: AbortSignal
	) => Promise<InfinityCoursesType>
	deletedCoursesTeacher: (
		userId: string,
		coursesId: string
	) => Promise<ApiResponse<CoursesType>>
	createCoursesTeacher: (
		userId: string,
		courses: CreateCoursesType
	) => Promise<ApiResponse<CoursesType>>
	getOneCourses: (
		id: string,
		signal?: AbortSignal
	) => Promise<ApiResponse<CoursesType>>
}
