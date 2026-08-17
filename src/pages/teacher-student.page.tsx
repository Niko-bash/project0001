import { TeacherServices } from '@/features/teacher/api/api'
import {
	type CreateHomework,
	type Homework,
	type StatusHomeWork,
	type Student,
	type StudentHomeWork,
	type TeacherStudentLoaderData
} from '@/features/teacher/api/type'
import { Modal } from '@/shared/ui/modal'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData } from 'react-router'

export function TeacherStudentPage() {
	const loaderData: TeacherStudentLoaderData = useLoaderData()
	const [open, setOpen] = useState(false)
	const [homeWork, setHomeWork] = useState<Homework[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	const onSubmit = async (val: CreateHomework) => {
		const response = await TeacherServices.createAddingHomework(
			val,
			loaderData.student.id
		)
		if (response.success) {
			console.log('Suc')
			handleClose()
		}
	}

	useEffect(() => {
		const fetchHomeWork = async (studentId: string) => {
			setIsLoading(true)
			try {
				const response = await fetch(
					`/api/userQuest?studentId=${studentId}`,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					throw new Error('This student is not search')
				}

				const data: StudentHomeWork[] = await response.json()

				setHomeWork(data[0] && data[0].homework)
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchHomeWork(loaderData.student.id)
	}, [loaderData.student.id])

	return (
		<>
			<div className="pt-10">
				<ProfileStudent user={loaderData.student} />
				<Button
					onClick={() => setOpen(true)}
					variant="contained"
					className="w-full"
				>
					Adding quest
				</Button>
				<div>
					<h2>History quest</h2>
					<ol className="flex flex-col gap-4">
						{homeWork &&
							homeWork.map((quest) => (
								<HomeWorkItem
									item={quest}
									key={quest.id}
								/>
							))}
					</ol>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				title={<div>Create homework for {loaderData.student.name}</div>}
				content={<TeacherCreateForm onSubmit={onSubmit} />}
				actions={
					<>
						<Button
							type="submit"
							form="form"
						>
							Create
						</Button>
						<Button onClick={handleClose}>Close</Button>
					</>
				}
			/>
		</>
	)
}

const ProfileStudent = ({ user }: { user: Student }) => {
	return (
		<div className="border p-3 rounded-2xl">
			<div>Name student:{user.name}</div>
			<div>Email student:{user.email}</div>
		</div>
	)
}

const TeacherCreateForm = ({
	onSubmit
}: {
	onSubmit: (val: CreateHomework) => void
}) => {
	const { register, handleSubmit } = useForm<CreateHomework>()

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 p-2"
			id="form"
		>
			<TextField
				fullWidth
				label="Homework name"
				{...register('name')}
				autoFocus
			/>
			<TextareaAutosize
				minRows={3}
				placeholder="Homework description"
				style={{
					width: '100%',
					padding: '15px',
					border: '1px solid grey',
					borderRadius: '5px'
				}}
				{...register('description')}
			/>
			<TextField
				type="date"
				{...register('date')}
			/>
		</form>
	)
}

const HomeWorkItem = ({ item }: { item: Homework }) => {
	return (
		<li className="list-decimal border rounded-2xl p-3">
			<h3>Name quest: {item.name}</h3>
			<p>Description: {item.description}</p>
			<div>Completed before: {new Date(item.date).toLocaleDateString()}</div>
			<div className="flex items-center gap-2">
				<DotStatus status={item.status} />
				status: {item.status}
			</div>
			<Button>Go to quest</Button>
		</li>
	)
}

const statusRec: Record<StatusHomeWork, string> = {
	completed: 'bg-green-500',
	overdue: 'bg-red-500',
	progress: 'bg-gray-500',
	review: 'bg-yellow-500'
}

const DotStatus = ({ status }: { status: StatusHomeWork }) => {
	return <div className={clsx('w-4 h-4 rounded-2xl', statusRec[status])} />
}
