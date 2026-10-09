import {
	type Homework,
	type StudentHomeWork
} from '@/features/teacher/api/type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useCalendar } from '../model'
import { DAYS_OF_WEEK } from '../model/useCalendar'
import type { CalendarType } from './type'

export const Calendar = ({ studentId }: CalendarType) => {
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
