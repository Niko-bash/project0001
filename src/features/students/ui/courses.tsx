import type { CoursesType } from '@/features/courses'
import { DEFAULT_AVATAR } from '@/shared/config/constant'

export const Courses = ({ courses }: { courses: CoursesType }) => {
	console.log(courses)
	return (
		<div>
			<div className="flex gap-4">
				<div>
					<img
						src={courses.img ?? DEFAULT_AVATAR}
						alt="Logo"
					/>
				</div>

				<div>
					<h2>Name courses: {courses.name}</h2>
					<div>Description: {courses.description}</div>
				</div>
			</div>
		</div>
	)
}
