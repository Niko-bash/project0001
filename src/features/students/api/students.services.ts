import type { Homework, StudentHomeWork } from '@/features/teacher/api/type'
import type { ApiResponse } from '@/shared/api/type'

export const StudentServices = {
	async updateTasks(
		body: Homework,
		studentId: string
	): Promise<ApiResponse<Homework[]>> {
		const student = await fetch(`/api/userQuest?studentId=${studentId}`, {
			method: 'GET'
		})

		if (!student.ok) {
			throw new Error('This students is not')
		}

		const data = await student.json()

		const user: StudentHomeWork = data && data[0]

		if (!user) {
			throw new Error('user is not')
		}

		const homework = user.homework.map((item) =>
			item.id === body.id ? { ...item, ...body } : item
		)

		const updateUserTasks: StudentHomeWork = { ...user, homework: homework }

		const updateTasks = await fetch(`/api/userQuest/${user.id}`, {
			method: 'PATCH',
			body: JSON.stringify(updateUserTasks)
		})

		if (!updateTasks.ok) {
			throw new Error('Tasks is not save')
		}
		const dataTasks = await updateTasks.json()
		return {
			status: 200,
			success: true,
			data: dataTasks
		}
	}
}
