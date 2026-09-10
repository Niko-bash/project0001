import { TextField } from '@mui/material'
import { type StepNameProps } from '../type'

export const NameStep = ({ form }: StepNameProps) => {
	const { errors } = form.formState
	return (
		<div className=" flex flex-col gap-4">
			<div>Name Courses</div>
			<TextField
				{...form.register('name')}
				placeholder="Name Courses"
			/>
			{errors.name && <div>name</div>}
		</div>
	)
}
