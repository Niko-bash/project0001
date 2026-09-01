import {
	TableStudent,
	useStudents,
	type TeacherLoaderData
} from '@/features/teacher'
import { useLoaderData } from 'react-router'

export function TeacherPage() {
	const { data, user } = useLoaderData<TeacherLoaderData>()

	const { handleNextPage, handlePrevPage, isLoading, users } = useStudents(
		data.id
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
