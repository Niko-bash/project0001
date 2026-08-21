import type { Homework } from '@/features/teacher/api/type'

export const getDaysInMonth = (years?: number, month?: number) => {
	const now = new Date()
	const y = years ?? now.getFullYear()
	const m = month ?? now.getMonth()

	return new Date(y, m + 1, 0).getDate()
}

export const getDayOfWeek = (date: Date): number => {
	return date.getDay()
}

export const getDayOfIndex = (dayOfWeek: number): number => {
	return dayOfWeek % 7
}

export const getHomeWorkForDate = (
	date: Date,
	homework: Homework[]
): Homework[] => {
	return homework.filter((work) => {
		const homeworkDate = new Date(work.date)

		return (
			homeworkDate.getFullYear() === date.getFullYear() &&
			homeworkDate.getMonth() === date.getMonth() &&
			homeworkDate.getDate() === date.getDate()
		)
	})
}
