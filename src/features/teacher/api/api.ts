import type { User } from '@/features/auth/api/type'
import type { UserCourses } from '@/features/my-courses/api/type'
import type { ApiResponse } from '@/shared/api/type'
import type {
	CreateHomework,
	Homework,
	InfinityStudentsTableDataAdapter,
	StudentHomeWork,
	UserTableData
} from './type'

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

		const fetchesReviewStatus = needUsers.map((user) =>
			fetch(`/api/userQuest?studentId=${user.userId}`)
		)

		const [userResults, statusResults] = await Promise.all([
			Promise.all(
				fetches.map((fetch) =>
					fetch.then((res) => (res.ok ? res.json() : null))
				)
			),
			Promise.all(
				fetchesReviewStatus.map((fetch) =>
					fetch.then((res) => (res.ok ? res.json() : null))
				)
			)
		])

		const statusMap = new Map(
			statusResults
				.filter(
					(student): student is [StudentHomeWork] =>
						student !== null && student.length > 0
				)

				.map(([item]) => [item.studentId, item])
		)

		const promiseUsers: UserTableData[] = userResults
			.filter((user): user is User => user !== null)
			.map((user) => {
				const { avatar, password, role, ...data } = user

				const statusHomeWork = statusMap.get(data.id)

				const status =
					statusHomeWork &&
					statusHomeWork.homework.some((item) => item.status === 'review')

				return { ...data, status }
			})

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
	},
	async createAddingHomework(
		data: CreateHomework,
		studentId: string
	): Promise<ApiResponse<StudentHomeWork>> {
		const searchStudent = await fetch(
			`/api/userQuest?studentId=${studentId}`,
			{
				method: 'GET'
			}
		)

		if (!searchStudent.ok) {
			throw new Error('This student is not')
		}

		const student = await searchStudent.json()

		if (student.length === 0) {
			const createUser: Omit<StudentHomeWork, 'id'> = {
				studentId,
				homework: [
					{
						...data,
						date: new Date(data.date).toISOString(),
						status: 'progress',
						id: Date.now().toString()
					}
				]
			}

			const createStudent = await fetch('/api/userQuest', {
				method: 'POST',
				body: JSON.stringify(createUser)
			})

			if (!createStudent.ok) {
				throw new Error('Error create Student and homework')
			}

			const response = await createStudent.json()

			return {
				status: 200,
				success: true,
				data: response
			}
		}

		const user: StudentHomeWork = student[0]

		const updateStudent: StudentHomeWork = {
			...user,
			homework: [
				...user.homework,
				{
					...data,
					status: 'progress',
					id: Date.now().toString()
				}
			]
		}

		const update = await fetch(`/api/userQuest/${updateStudent.id}`, {
			method: 'PATCH',
			body: JSON.stringify(updateStudent)
		})

		if (!update.ok) {
			throw new Error('Update homework student error')
		}

		const updateData = await update.json()

		return {
			status: 201,
			success: true,
			data: updateData
		}
	},
	async getStudentHomeWork(
		studentId: string
	): Promise<ApiResponse<Homework[]>> {
		const response = await fetch(`/api/userQuest?studentId=${studentId}`, {
			method: 'GET'
		})

		if (!response.ok) {
			throw new Error('This student is not search')
		}

		const data: StudentHomeWork[] = await response.json()

		return {
			status: 200,
			success: true,
			data: data[0] ? data[0].homework : []
		}
	}
}
