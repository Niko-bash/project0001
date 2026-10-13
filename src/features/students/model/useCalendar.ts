import type { Homework } from '@/features/teacher'
import { useMemo, useState } from 'react'
import {
	getDayOfIndex,
	getDayOfWeek,
	getDaysInMonth,
	getHomeWorkForDate
} from '../lib/getDate'
import type { CalendarDays } from '../ui/type'

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]
export const DAYS_OF_WEEK = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]

export const useCalendar = (dateHW: Homework[]) => {
	const [currentDate, setCurrentDate] = useState(() => new Date())

	const month = currentDate.getMonth()
	const years = currentDate.getFullYear()

	const nameMonth = MONTHS[month]

	const daysIsMonth = getDaysInMonth(years, month)

	const calendarDays = useMemo(() => {
		const days: CalendarDays[] = []
		const firstDayOfMonth = new Date(years, month, 1)
		const firstDayOfWeek = getDayOfWeek(firstDayOfMonth)

		for (let i = 1; i < firstDayOfWeek; i++) {
			days.push({
				dayNumber: 0,
				dayOfWeek: '',
				date: new Date(years, month, -firstDayOfWeek + i + 1),
				datesHW: []
			})
		}

		for (let day = 1; day <= daysIsMonth; day++) {
			const date = new Date(years, month, day)
			const dayOfWeekIndex = getDayOfIndex(getDayOfWeek(date))

			days.push({
				dayNumber: day,
				dayOfWeek: DAYS_OF_WEEK[dayOfWeekIndex],
				date: date,
				datesHW: getHomeWorkForDate(date, dateHW)
			})
		}
		return days
	}, [years, month, dateHW, daysIsMonth])

	const handleIncrement = () => {
		setCurrentDate(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
		)
	}

	const handleDecrement = () => {
		setCurrentDate(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
		)
	}

	return {
		handleDecrement,
		handleIncrement,
		calendarDays,
		nameMonth,
		years,
		month
	}
}
