import type { SearchType } from '@/pages/courses.page'
import type { ApiResponse } from '@/shared/api/type'
import type { InfinityCoursesType } from '../ui/card'

type CommentCoursesType = {
	username: string
	rating: number
	comment: string
}
export type CoursesType = {
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
	getOneCourses: (id: string) => Promise<ApiResponse<CoursesType>>
}
