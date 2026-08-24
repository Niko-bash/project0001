import {
	type Homework,
	type StudentHomeWork
} from '@/features/teacher/api/type'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import {
	getDayOfIndex,
	getDayOfWeek,
	getDaysInMonth,
	getHomeWorkForDate
} from '../lib/getDate'

const MONTHS = [
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
const DAYS_OF_WEEK = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]

type CalendarDays = {
	dayNumber: number
	dayOfWeek: string
	date: Date
	datesHW: Homework[]
}

export const Calendar = ({ studentId }: { studentId: string }) => {
	const [dateHW, setDateHW] = useState<Homework[]>([])
	const {
		calendarDays,
		handleDecrement,
		handleIncrement,
		nameMonth,
		years,
		month
	} = useCalendar(dateHW)

	useEffect(() => {
		const fetchData = async () => {
			const dateHW = await fetch(`/api/userQuest?studentId=${studentId}`, {
				method: 'GET'
			})

			if (!dateHW.ok) {
				throw new Error('This homework is not')
			}

			const date: StudentHomeWork[] = await dateHW.json()
			setDateHW(date[0] ? date[0].homework : [])
		}

		fetchData()
	}, [studentId])

	return (
		<div>
			<div className="flex justify-between">
				<button onClick={handleDecrement}>{'<<'}</button>
				{nameMonth}
				<button onClick={handleIncrement}>{'>>'}</button>
			</div>
			<div className="text-center">{years}</div>
			<div className="grid grid-cols-7 gap-1 mb-2">
				{DAYS_OF_WEEK.map((day) => (
					<div
						key={day}
						className="text-center font-semibold text-sm py-2 bg-gray-100"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{calendarDays.map((item, index) => (
					<div
						className={clsx(
							'min-h-50 border p-1',
							item.dayNumber === new Date().getDate() &&
								month === new Date().getMonth() &&
								years === new Date().getFullYear()
								? 'border-blue-500 border-2'
								: 'border-gray-200'
						)}
						key={index}
					>
						{item.dayNumber > 0 && item.dayNumber}
						{item.datesHW.length > 0 && (
							<ul>
								{item.datesHW.map((item) => (
									<li
										key={item.id}
										className="flex justify-between"
									>
										<div>{item.name}</div>
										<div>{item.status}</div>
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

const useCalendar = (dateHW: Homework[]) => {
	const [currentDate, setCurrentDate] = useState(() => new Date())

	const month = currentDate.getMonth()
	const years = currentDate.getFullYear()

	const nameMonth = MONTHS[month]

	const daysIsMonth = getDaysInMonth(years, month)

	const calendarDays = useMemo(() => {
		const days: CalendarDays[] = []
		const firstDayOfMonth = new Date(years, month, 1)
		const firstDayOfWeek = getDayOfWeek(firstDayOfMonth)
		// const firstDayIndex = getDayOfIndex(firstDayOfWeek)
		// console.log(firstDayIndex)

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
