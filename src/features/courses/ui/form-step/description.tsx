import { TextareaAutosize } from '@mui/material'
import { type StepDescriptionProps } from '../type'

export const DescriptionStep = ({ form }: StepDescriptionProps) => {
	const { errors } = form.formState
	return (
		<div className="flex flex-col gap-5">
			<div>Description courses:</div>
			<TextareaAutosize
				{...form.register('description')}
				placeholder="description courses"
				minRows={3}
				style={{
					width: '100%',
					padding: '15px',
					border: '1px solid grey',
					borderRadius: '5px'
				}}
			/>
			{errors.description && <div>descript</div>}
		</div>
	)
}
