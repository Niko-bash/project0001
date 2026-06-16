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
	reviews: CommentCoursesType[]
}
