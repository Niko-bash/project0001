import { useState } from 'react'
import { getDaysInMonth } from '../lib/getDaysInMonth'

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
const daysEngMon = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]

export const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(() => new Date())

	const month = currentDate.getMonth()
	const years = currentDate.getFullYear()

	const nameMonth = MONTHS[month]

	const days = getDaysInMonth(years, month)

	const calendarDays = Array.from({ length: days }, (_, index) => ({
		index: index + 1,
		days: daysEngMon[index % 7]
	}))

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

	return (
		<div>
			<button onClick={handleIncrement}>+</button>
			{nameMonth}
			<button onClick={handleDecrement}>-</button>
			<div>|</div>
			{years}
			<ul className="flex flex-wrap gap-2 h-full ">
				{calendarDays.map((item) => (
					<div
						className="border w-1/8 min-h-50 text-center"
						key={item.index}
					>
						{item.days}
					</div>
				))}
			</ul>
		</div>
	)
}
