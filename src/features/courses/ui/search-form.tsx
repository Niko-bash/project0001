import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material'
import { type UseFormReturn } from 'react-hook-form'

export const CoursesSearchForm = ({ form }: { form: UseFormReturn }) => {
	return (
		<form
			className="flex flex-col gap-3"
			id="form"
		>
			<TextField
				fullWidth
				label="title"
				{...form.register('title')}
			/>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">sort</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="sort"
					defaultValue="-rating"
					{...form.register('sort')}
				>
					<MenuItem value={'rating'}>ASC</MenuItem>
					<MenuItem value={'-rating'}>DESC</MenuItem>
				</Select>
			</FormControl>
		</form>
	)
}
