import type { User, UserTableData } from '@/features/auth/api/type'
import type { UserCourses } from '@/features/my-courses/api/type'
import type { ApiResponse } from '@/shared/api/type'

export const TeacherServices = {
	async getAllStudents(
		coursesId: string
	): Promise<ApiResponse<UserTableData[]>> {
		const findUsers = await fetch('/api/userCourses', {
			method: 'GET'
		})
		if (!findUsers.ok) {
			throw new Error('Bad request')
		}

		const data: UserCourses[] = await findUsers.json()

		const findStudents = data.filter((user) =>
			user.courses.includes(coursesId)
		)

		const fetches = findStudents.map((user) =>
			fetch(`/api/user/${user.userId}`)
		)

		const promiseUsers: UserTableData[] = await Promise.all(fetches)
			.then((res) => res.filter((response) => response.ok))
			.then((res) => Promise.all(res.map((response) => response.json())))
			.then((res) =>
				res.map((user: User) => {
					const { avatar, password, role, ...data } = user
					return data
				})
			)

		return {
			status: 200,
			success: true,
			data: promiseUsers
		}
	}
}
