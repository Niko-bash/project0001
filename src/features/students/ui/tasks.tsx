import {
	type Homework,
	type StatusHomeWork,
	type StudentHomeWork
} from '@/features/teacher/api/type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { StudentServices } from '../api/students.services'
import type { BoardList, TasksType } from './type'

const BOARD_LIST: BoardList[] = [
	{
		id: '1',
		status: 'progress',
		title: 'Progress'
	},
	{
		id: '2',
		status: 'review',
		title: 'Review'
	},
	{
		id: '3',
		status: 'completed',
		title: 'Completed'
	}
] as const

export const Tasks = ({ studentId }: TasksType) => {
	const [homeWork, setHomeWork] = useState<Homework[]>([])
	const [draggedIndex, setDraggedIndex] = useState<string | null>(null)

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		index: string
	) => {
		setDraggedIndex(index)
		e.dataTransfer.setData('text/plain', index)
		e.dataTransfer.effectAllowed = 'move'

		e.currentTarget.style.opacity = '0.5'
	}

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.opacity = '1'
		setDraggedIndex(null)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	const handleDrop = async (
		e: React.DragEvent<HTMLDivElement>,
		status: StatusHomeWork
	) => {
		e.preventDefault()
		const dragIndex = parseInt(
			e.dataTransfer.getData('text/plain')
		).toString()

		if (!dragIndex) {
			return
		}

		const updateTask = homeWork.find((item) => item.id === dragIndex)

		if (!updateTask) {
			return
		}

		updateTask.status = status

		const newHomeWork = homeWork.map((item) =>
			item.id === dragIndex ? updateTask : item
		)

		setHomeWork(newHomeWork)

		localStorage.setItem('tasks', JSON.stringify(newHomeWork))

		const updateTasksStudent = await StudentServices.updateTasks(
			updateTask,
			studentId
		)

		if (!updateTasksStudent.success) {
			const homeWork = localStorage.getItem('tasks')
			setHomeWork(homeWork && JSON.parse(homeWork))
		}

		setDraggedIndex(null)
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(`/api/userQuest?studentId=${studentId}`, {
				method: 'GET'
			})

			if (!data.ok) {
				throw new Error('Error fetch HM students')
			}

			const homeWork: StudentHomeWork[] = await data.json()
			setHomeWork(homeWork[0] ? homeWork[0].homework : [])
		}

		fetchData()
	}, [studentId])

	return (
		<div className="grid grid-cols-3 gap-3 min-h-[80vh]">
			{BOARD_LIST.map((board) => (
				<BoardHomeWork
					key={board.id}
					handleDragOver={handleDragOver}
					handleDragEnd={handleDragEnd}
					handleDragStart={handleDragStart}
					handleDrop={handleDrop}
					items={homeWork}
					status={board.status}
					title={board.title}
				/>
			))}
		</div>
	)
}

const BoardHomeWork = ({
	handleDragOver,
	handleDrop,
	items,
	status,
	title,
	handleDragStart,
	handleDragEnd
}: {
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
	handleDrop: (
		e: React.DragEvent<HTMLDivElement>,
		status: StatusHomeWork
	) => void
	items: Homework[]
	status: StatusHomeWork
	title: React.ReactNode
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
	handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void
}) => {
	const filteredItems = items.filter((item) => item.status === status)
	return (
		<div
			className={clsx(
				'border text-center select-none',
				ColorBorderStatus[status]
			)}
			onDragOver={handleDragOver}
			onDrop={(e) => handleDrop(e, status)}
		>
			<h4>{title}</h4>
			<ul className="flex flex-col gap-3">
				{filteredItems.length > 0 &&
					filteredItems.map((item) => (
						<TaskItem
							item={item}
							key={item.id}
							handleDrag={(e) => handleDragStart(e, item.id)}
							handleEnd={handleDragEnd}
						/>
					))}
			</ul>
		</div>
	)
}

const ColorBorderStatus: Record<StatusHomeWork, string> = {
	progress: 'border-gray-300',
	review: 'border-amber-300',
	completed: 'border-green-300',
	overdue: 'border-red-300'
} as const

const TaskItem = ({
	item,
	handleDrag,
	handleEnd
}: {
	item: Homework
	handleDrag: (e: React.DragEvent<HTMLDivElement>, index: string) => void
	handleEnd: (e: React.DragEvent<HTMLDivElement>) => void
}) => {
	return (
		<div
			className={clsx('border', ColorBorderStatus[item.status])}
			draggable
			onDragStart={(e) => handleDrag(e, item.id)}
			onDragEnd={handleEnd}
		>
			<div>{item.name}</div>
			<div>{new Date(`${item.date}`).toLocaleString()}</div>
		</div>
	)
}
