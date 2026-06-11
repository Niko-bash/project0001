import type { SearchType } from '@/pages/courses.page'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material'
import type { FormikValues } from 'formik'
import { useEffect, useState } from 'react'

const useDebounce = <T,>(value: T, delay: number) => {
	const [debounceState, setDebounceState] = useState<T>(value)

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebounceState(value)
		}, delay)

		return () => clearTimeout(timerId)
	}, [value, delay])

	return debounceState
}

export const CoursesSearchForm = ({
	form,
	onChange
}: {
	form: FormikValues
	onChange: (params: SearchType, signal: AbortSignal) => Promise<void>
}) => {
	const value = useDebounce(form.values, 500)

	useEffect(() => {
		const controller = new AbortController()

		onChange(value, controller.signal)

		return () => controller.abort()
	}, [value, onChange])

	return (
		<form
			className="flex flex-col gap-3"
			id="form"
		>
			<TextField
				fullWidth
				label="title"
				name="title"
				value={form.values.title}
				onChange={form.handleChange}
			/>
			<FormControl>
				<InputLabel id="demo-simple-select-label">sort</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					name="sort"
					value={form.values.sort}
					label="sort"
					onChange={form.handleChange}
				>
					<MenuItem value={'rating'}>ASC</MenuItem>
					<MenuItem value={'-rating'}>DESC</MenuItem>
				</Select>
			</FormControl>
		</form>
	)
}
