import type { SearchType } from '@/pages/courses.page'
import { IndexDbServices } from '@/shared/api/indexDb.services'
import type { ApiResponse } from '@/shared/api/type'
import type { InfinityCoursesType } from '../ui/card'
import type { CoursesType, CreateCoursesType, VideoType } from './type'

export const INDEX_DB_KEYS = {
	VIDEO: 'VIDEO'
}

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
	},
	async createCoursesTeacher(
		userId: string,
		courses: CreateCoursesType
	): Promise<ApiResponse<CoursesType>> {
		const bodyData: Omit<CoursesType, 'id'> = {
			description: courses.description,
			creatorId: userId,
			img: courses.img,
			name: courses.name,
			video: INDEX_DB_KEYS.VIDEO,
			rating: '0',
			reviews: []
		}

		const video: VideoType = {
			url: courses.video.url,
			description: courses.video.description,
			id: Date.now().toString()
		}

		await IndexDbServices.saveVideo(video)

		const response = await fetch('/api/courses', {
			method: 'POST',
			body: JSON.stringify(bodyData)
		})

		if (!response.ok) {
			throw new Error('Courses is not created')
		}

		const data = await response.json()

		return { status: 200, success: true, data }
	}
}
