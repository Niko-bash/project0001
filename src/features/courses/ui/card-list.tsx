import { type Ref } from 'react'
import type { CoursesType } from '../api/type'
import { type InfinityCoursesType } from './card'

export const CoursesList = ({
	courses,
	onLoading,
	ref,
	render
}: {
	courses: InfinityCoursesType
	onLoading: boolean
	ref: Ref<HTMLDivElement>
	render: (item: CoursesType) => React.ReactNode
}) => {
	return (
		<div className="relative">
			<ul className="flex flex-wrap gap-4 justify-between">
				{courses.data ? (
					courses.data.map((course) => render(course))
				) : (
					<div>List empty, sorry =(</div>
				)}
			</ul>
			{onLoading && <div>Loading...</div>}
			{courses.next && <div ref={ref} />}
		</div>
	)
}
