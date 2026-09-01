import {
	TableStudent,
	useStudents,
	type TeacherLoaderData
} from '@/features/teacher'
import { TeacherServices } from '@/features/teacher/api/api'
import { useLoaderData } from 'react-router'

export function TeacherPage() {
	const { data, user } = useLoaderData<TeacherLoaderData>()

	const { handleNextPage, handlePrevPage, isLoading, users } = useStudents(
		data.id,
		TeacherServices
	)

	return (
		<TableStudent
			data={users}
			onPrev={handlePrevPage}
			onNext={handleNextPage}
			onLoading={isLoading}
			teacherId={user.id}
			coursesId={data.id}
		/>
	)
}
