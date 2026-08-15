import type {
	Student,
	TeacherStudentLoaderData
} from '@/features/teacher/api/type'
import { Button } from '@mui/material'
import { useLoaderData } from 'react-router'

export function TeacherStudentPage() {
	const data: TeacherStudentLoaderData = useLoaderData()

	return (
		<div className="pt-10">
			<ProfileStudent user={data.student} />
			<div>
				<h2>History quest</h2>
			</div>
			<Button>Adding quest</Button>
		</div>
	)
}

const ProfileStudent = ({ user }: { user: Student }) => {
	return (
		<div className="border p-3 rounded-2xl">
			<div>Name student:{user.name}</div>
			<div>Email student:{user.email}</div>
		</div>
	)
}
