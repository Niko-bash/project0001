import { type InfinityCoursesType } from '@/features/courses/ui/card'
import { CoursesList } from '@/features/courses/ui/card-list'
import { CoursesSearchForm } from '@/features/courses/ui/search-form'
import { Container } from '@mui/material'
import { useFormik } from 'formik'
import { useCallback, useState } from 'react'

export type SearchType = {
	title: string
	sort: '-rating' | 'rating'
	per_page: string
}

const fetchData = async (
	query: SearchType,
	page: string,
	signal?: AbortSignal
) => {
	try {
		const queryParams = new URLSearchParams({
			'name:contains': query.title,
			_page: page,
			_per_page: query.per_page,
			_sort: query.sort
		}).toString()

		const response = await fetch(`/api/courses?` + queryParams, {
			method: 'GET',
			signal: signal
		})
		if (!response.ok) {
			throw new Error()
		}
		const data: InfinityCoursesType = await response.json()
		return data
	} catch (e: unknown) {
		if (e instanceof DOMException && e.name === 'AbortError') {
			return
		}
	}
}
const CoursesPage = () => {
	const [courses, setCourses] = useState<InfinityCoursesType>({
		data: [],
		first: 0,
		prev: null,
		next: null,
		last: 0,
		pages: 0,
		items: 0
	})
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	const observerRef = (node: HTMLDivElement | null) => {
		if (!node || !hasMore || isLoading) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					const nextPage = page + 1
					const str = String(nextPage)
					setPage((prev) => prev + 1)
					fetchNext(str)
				}
			},
			{
				threshold: 0.1
			}
		)

		observer.observe(node)

		return () => observer.disconnect()
	}

	const formik = useFormik<SearchType>({
		initialValues: { sort: 'rating', title: '', per_page: '10' },
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values)
		}
	})

	const fetchNext = async (nextPage: string) => {
		if (isLoading || !hasMore) return
		const controller = new AbortController()
		try {
			setIsLoading(true)
			const newData = await fetchData(
				{
					per_page: formik.values.per_page,
					sort: formik.values.sort,
					title: formik.values.title
				},
				nextPage,
				controller.signal
			)
			if (newData) {
				setCourses((prev) => ({
					...newData,
					data: [...prev.data, ...newData.data]
				}))
			}
			if (newData && page >= newData.last) {
				setHasMore(false)
			}
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
		return () => controller.abort()
	}

	const handleSearchForm = useCallback(
		async (params: SearchType, signal: AbortSignal) => {
			const data = await fetchData({ ...params }, '1', signal)
			if (data) {
				setPage(1)
				setHasMore(true)
				setCourses(data)
			}
		},
		[setCourses]
	)

	return (
		<PageLayout
			form={
				<CoursesSearchForm
					form={formik}
					onChange={handleSearchForm}
				/>
			}
			list={
				<CoursesList
					courses={courses}
					onLoading={isLoading}
					ref={observerRef}
				/>
			}
		/>
	)
}

export default CoursesPage

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
