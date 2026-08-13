import { useLoaderData } from 'react-router'

export function TeacherStudentPage() {
	const data = useLoaderData()
	console.log(data)
	return <div>teacher-student page</div>
}
