import {
	TableStudent,
	useStudents,
	type TeacherLoaderData
} from '@/features/teacher'
import { TeacherServices } from '@/features/teacher/api/api'
import { useLoaderData } from 'react-router'

export function TeacherPage() {
	const { data, user } = useLoaderData<TeacherLoaderData>()

	const { students, status, error, onNextPage, onPrevPage } = useStudents(
		data.id,
		TeacherServices
	)

	return (
		<TableStudent
			data={students}
			onPrev={onPrevPage}
			onNext={onNextPage}
			error={error}
			status={status}
			teacherId={user.id}
			coursesId={data.id}
		/>
	)
}
