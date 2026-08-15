import type {
	Student,
	TeacherStudentLoaderData
} from '@/features/teacher/api/type'
import { Modal } from '@/shared/ui/modal'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLoaderData } from 'react-router'

type Homework = {
	id: string
	studentId: string
	name: string
	description: string
	date: string
}

type CreateHomework = Omit<Homework, 'id' | 'studentId'>

export function TeacherStudentPage() {
	const data: TeacherStudentLoaderData = useLoaderData()
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<div className="pt-10">
				<ProfileStudent user={data.student} />
				<div>
					<h2>History quest</h2>
				</div>
				<Button onClick={() => setOpen(true)}>Adding quest</Button>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				title={<div>Create homework for {data.student.name}</div>}
				content={<TeacherCreateForm />}
				actions={
					<>
						<Button
							type="submit"
							form="form"
						>
							Create
						</Button>
						<Button>Close</Button>
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

const TeacherCreateForm = () => {
	const { register, handleSubmit } = useForm<CreateHomework>()

	const onSubmit: SubmitHandler<CreateHomework> = async (val) => {
		console.log(val)
	}
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
