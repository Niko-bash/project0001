import type { SearchType } from '@/pages/courses.page'
import { useCallback, useState } from 'react'
import type { InfinityCoursesType } from '../ui/card'

const fetchData = async (
	query: SearchType,
	page: number,
	signal?: AbortSignal
) => {
	try {
		const queryParams = new URLSearchParams({
			'name:contains': query.title,
			_page: String(page),
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

export const useInfinityScroll = (values: SearchType) => {
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

	const fetchNext = useCallback(
		async (nextPage: number) => {
			if (isLoading || !hasMore) return

			setIsLoading(true)

			const controller = new AbortController()

			try {
				setIsLoading(true)
				const newData = await fetchData(values, nextPage, controller.signal)
				if (newData) {
					setCourses((prev) => ({
						...newData,
						data: [...prev.data, ...newData.data]
					}))
					const hasMorePages = Number(nextPage) < newData.last
					setHasMore(hasMorePages)
				}
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
			return () => controller.abort()
		},
		[values, hasMore, isLoading]
	)

	const observerRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node || !hasMore || isLoading) return

			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && !isLoading) {
						const nextPage = page + 1
						setPage(nextPage)
						fetchNext(nextPage)
					}
				},
				{
					threshold: 0.1,
					rootMargin: '100px'
				}
			)

			observer.observe(node)

			return () => observer.disconnect()
		},
		[hasMore, isLoading, page, fetchNext]
	)

	const handleSearchForm = useCallback(
		async (params: SearchType, signal: AbortSignal) => {
			const data = await fetchData({ ...params }, 1, signal)
			if (data) {
				setPage(1)
				setHasMore(true)
				setCourses(data)
			}
		},
		[setCourses]
	)

	return { courses, handleSearchForm, observerRef, isLoading }
}
