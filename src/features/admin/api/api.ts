import type { User } from '@/features/auth'
import type { CoursesType } from '@/features/courses'
import { MONTHS } from '@/features/students/model/useCalendar'
import type { PanelDataType } from '../ui/type'

export const AdminServices = {
	async getDashboardUsers(signal?: AbortSignal): Promise<PanelDataType[]> {
		const response = await fetch('/api/user', {
			method: 'GET',
			signal
		})

		if (!response.ok) {
			throw new Error('Error admin panel-users')
		}

		const users: User[] = await response.json()

		// const map = new Map<string, PanelDataType>()
		const year = new Date().getFullYear()

		// for (const user of data) {
		// 	const date = new Date(user.createAt)
		// 	const month = date.toLocaleString('en', { month: 'long' })

		// 	const key = `${month},${year}`

		// 	const exist = map.get(key)

		// 	if (exist) {
		// 		exist.value++
		// 		continue
		// 	}

		// 	map.set(key, { month, value: 1 })
		// }

		// const result = MONTHS.map<PanelDataType>((month) => {
		// 	return { month: month, value: map.get(`${month},${year}`)?.value ?? 0 }
		// })

		const counts = new Array(12).fill(0)

		for (const user of users) {
			const date = new Date(user.createAt)
			if (date.getFullYear() !== year) continue

			counts[date.getMonth()]++
		}

		const result = counts.map((_, i) => ({
			month: MONTHS[i],
			value: counts[i]
		}))

		return result
	},
	async getDashboardCourses(signal?: AbortSignal): Promise<PanelDataType[]> {
		const response = await fetch('/api/courses', {
			method: 'GET',
			signal
		})

		if (!response.ok) {
			throw new Error('Error loading panel-courses')
		}

		const courses: CoursesType[] = await response.json()

		const year = new Date().getFullYear()

		const counts = new Array(12).fill(0)

		for (const user of courses) {
			const date = new Date(user.createAt)
			if (date.getFullYear() !== year) continue

			counts[date.getMonth()]++
		}

		const result = counts.map((_, i) => ({
			month: MONTHS[i],
			value: counts[i]
		}))

		return result
	}
}
