import type { User } from '@/features/auth/api/type'
import type { UserCourses } from '@/features/my-courses/api/type'
import type { ApiResponse } from '@/shared/api/type'
import type { InfinityStudentsTableDataAdapter, UserTableData } from './type'

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
	},
	async getAllStudentsPagination(
		coursesId: string,
		page: number = 1,
		limit: number = 4
	): Promise<ApiResponse<InfinityStudentsTableDataAdapter<UserTableData>>> {
		const findUsers = await fetch(`/api/userCourses`, {
			method: 'GET'
		})

		if (!findUsers.ok) {
			throw new Error('Users is not')
		}
		const data: UserCourses[] = await findUsers.json()

		const findStudents = data.filter((user) =>
			user.courses.includes(coursesId)
		)

		const last = Math.ceil(findStudents.length / limit)

		const needUsers = findStudents.slice((page - 1) * limit, limit * page)
		const next = page + 1 > last ? null : page + 1
		const prev = page - 1 > 0 ? page - 1 : null

		const fetches = needUsers.map((user) => fetch(`/api/user/${user.userId}`))

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
			data: {
				data: promiseUsers,
				first: 1,
				items: findStudents.length,
				next: next,
				prev: prev,
				last: last,
				pages: page
			}
		}
	}
}
