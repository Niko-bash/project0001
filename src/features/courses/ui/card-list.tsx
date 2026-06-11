import type { Ref } from 'react'
import { CardCourses, type InfinityCoursesType } from './card'

export const CoursesList = ({
	courses,
	onLoading,
	ref
}: {
	courses: InfinityCoursesType
	onLoading: boolean
	ref: Ref<HTMLDivElement>
}) => {
	return onLoading ? (
		<div>Loading...</div>
	) : (
		<div className="relative">
			<ul className="flex flex-wrap gap-4 justify-between">
				{courses.data &&
					courses.data.map((course) => (
						<CardCourses
							key={course.id}
							course={course}
						/>
					))}
			</ul>
			{courses.next && (
				<div
					ref={ref}
					className="w-full h-4"
					aria-hidden="true"
				/>
			)}
		</div>
	)
}
