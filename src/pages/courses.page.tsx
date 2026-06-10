import { type CoursesType } from '@/features/courses/ui/card'
import { CoursesList } from '@/features/courses/ui/card-list'
import {
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

type SearchType = {
	title: string
	sort: '-rating' | 'rating'
}

const fetchData = async (
	signal: AbortSignal,
	setData: (data: CoursesType[]) => void,
	setStateOnLoad: (arg: boolean) => void
) => {
	try {
		setStateOnLoad(true)
		const response = await fetch('/api/courses', {
			method: 'GET',
			signal: signal
		})
		if (!response.ok) {
			throw new Error()
		}
		const data = await response.json()
		setData(data)
	} catch (e: unknown) {
		if (e instanceof DOMException && e.name === 'AbortError') {
			return
		}
	} finally {
		setStateOnLoad(false)
	}
}

const CoursesPage = () => {
	const [courses, setCourses] = useState<CoursesType[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const signal = new AbortController()

		fetchData(signal.signal, setCourses, setLoading)

		return () => signal.abort()
	}, [])

	return (
		<PageLayout
			form={<CoursesSearchForm />}
			list={
				<CoursesList
					courses={courses}
					loading={loading}
				/>
			}
		/>
	)
}

export default CoursesPage

const CoursesSearchForm = () => {
	const formik = useFormik<SearchType>({
		initialValues: { sort: '-rating', title: '' },
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values)
		}
	})

	return (
		<form
			className="flex flex-col gap-3"
			id="form"
		>
			<TextField
				fullWidth
				label="title"
				name="title"
				value={formik.values.title}
				onChange={formik.handleChange}
			/>
			<FormControl>
				<InputLabel id="demo-simple-select-label">sort</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					name="sort"
					value={formik.values.sort}
					label="sort"
					onChange={formik.handleChange}
				>
					<MenuItem value={'rating'}>ASC</MenuItem>
					<MenuItem value={'-rating'}>DESC</MenuItem>
				</Select>
			</FormControl>
		</form>
	)
}

const PageLayout = ({
	form,
	list
}: {
	form: React.ReactNode
	list: React.ReactNode
}) => {
	return (
		<section className="pt-10">
			<Container>
				<div className="flex flex-col gap-4">
					{form}
					{list}
				</div>
			</Container>
		</section>
	)
}
