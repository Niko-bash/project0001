import { CardCourses, type CoursesType } from './card'

export const CoursesList = ({
	courses,
	loading
}: {
	courses: CoursesType[]
	loading: boolean
}) => {
	return loading ? (
		<div>Loading...</div>
	) : (
		<ul className="flex flex-wrap gap-4 justify-between">
			{courses &&
				courses.map((course) => (
					<CardCourses
						key={course.id}
						course={course}
					/>
				))}
		</ul>
	)
}
