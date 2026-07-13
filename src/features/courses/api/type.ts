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
}

type VideoType = {
	url: string
	description: string
}

export type CreateCoursesType = Pick<
	CoursesType,
	'name' | 'description' | 'img'
> & { video: VideoType }
