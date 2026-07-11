import type { SearchType } from '@/pages/courses.page'
import type { InfinityCoursesType } from '../ui/card'

export const CoursesServices = {
	async getCourses(
		query: SearchType,
		page: number,
		signal?: AbortSignal
	): Promise<InfinityCoursesType> {
		const queryParams = new URLSearchParams({
			'name:contains': query.title || '',
			_page: String(page),
			_per_page: query.per_page || '10',
			_sort: query.sort || '-rating'
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
	}
}
