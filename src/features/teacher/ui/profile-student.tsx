import type { Student } from '../api/type'

export const ProfileStudent = ({ user }: { user: Student }) => {
	return (
		<div className="border p-3 rounded-2xl">
			<div>Name student:{user.name}</div>
			<div>Email student:{user.email}</div>
		</div>
	)
}
