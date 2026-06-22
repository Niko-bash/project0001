import type { SearchType } from '@/pages/courses.page'
import { useDebounce } from '@/shared/hook/useDebounce'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material'
import { useEffect } from 'react'
import { useWatch, type UseFormReturn } from 'react-hook-form'

export const CoursesSearchForm = ({
	onChange,
	form
}: {
	onChange: (params: SearchType, signal: AbortSignal) => Promise<void>
	form: UseFormReturn<SearchType>
}) => {
	const value = useWatch({ control: form.control })
	const values = useDebounce(value, 500)
	useEffect(() => {
		const controller = new AbortController()

		onChange(values, controller.signal)

		return () => controller.abort()
	}, [values, onChange])

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
