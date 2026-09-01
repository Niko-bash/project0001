import { TextareaAutosize, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import type { CreateHomework } from '../api/type'

export const TeacherCreateForm = ({
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
