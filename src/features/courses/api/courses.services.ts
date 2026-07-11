import type { SearchType } from '@/pages/courses.page'
import type { ApiResponse } from '@/shared/api/type'
import type { InfinityCoursesType } from '../ui/card'
import type { CoursesType } from './type'

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
	},
	async deletedCoursesTeacher(
		userId: string,
		coursesId: string
	): Promise<ApiResponse<CoursesType>> {
		const courses = await fetch(`/api/courses?creatorId=${userId}`, {
			method: 'GET'
		})
		if (!courses.ok) {
			throw new Error('courses this user is not create')
		}

		const response = await fetch(`/api/courses/${coursesId}`, {
			method: 'DELETE'
		})

		if (!response.ok) {
			throw new Error('Courses in not deleted')
		}

		const data = await response.json()

		return {
			status: 200,
			success: true,
			data
		}
	}
}
