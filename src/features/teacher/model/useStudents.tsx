import { useEffect, useState } from 'react'
import { TeacherServices } from '../api/api'
import type {
	InfinityStudentsTableDataAdapter,
	UserTableData
} from '../api/type'

export const useStudents = (dataId: string) => {
	const [users, setUsers] = useState<
		InfinityStudentsTableDataAdapter<UserTableData>
	>({
		data: [],
		first: 0,
		prev: null,
		next: null,
		last: 0,
		pages: 0,
		items: 0
	})
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true)
				const usersPaginate =
					await TeacherServices.getAllStudentsPagination(dataId, page)

				if (!usersPaginate.success) {
					throw new Error('bad request')
				}
				setUsers(usersPaginate.data)
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUsers()
	}, [dataId, page])

	const handleNextPage = () => {
		setPage((prev) => prev + 1)
	}

	const handlePrevPage = () => {
		setPage((prev) => prev - 1)
	}

	return { users, handleNextPage, handlePrevPage, isLoading }
}
