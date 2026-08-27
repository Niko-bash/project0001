import { TeacherServices } from '@/features/teacher/api/api'
import type {
	InfinityStudentsTableDataAdapter,
	TeacherLoaderData,
	UserTableData
} from '@/features/teacher/api/type'
import { ROUTES } from '@/shared/lib/router-config'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'

export function TeacherPage() {
	const { data, user } = useLoaderData<TeacherLoaderData>()
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
					await TeacherServices.getAllStudentsPagination(data.id, page)

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
	}, [data.id, page])

	const handleNextPage = () => {
		setPage((prev) => prev + 1)
	}

	const handlePrevPage = () => {
		setPage((prev) => prev - 1)
	}

	return (
		<TableStudent
			data={users}
			onPrev={handlePrevPage}
			onNext={handleNextPage}
			onLoading={isLoading}
			teacherId={user.id}
			coursesId={data.id}
		/>
	)
}

const TableStudent = ({
	data,
	onPrev,
	onNext,
	onLoading,
	teacherId,
	coursesId
}: {
	data: InfinityStudentsTableDataAdapter<UserTableData>
	onPrev: () => void
	onNext: () => void
	onLoading: boolean
	teacherId: string
	coursesId: string
}) => {
	const navigate = useNavigate()

	return (
		<TableCustom
			data={data}
			columns={['ID', 'Name', 'Email', 'Status']}
			renderRows={(item) => (
				<tr
					key={item.id}
					className="border border-gray-200 hover:bg-gray-200 hover:translate-x-6 duration-300 ease-in-out cursor-pointer"
					onClick={() =>
						navigate(
							ROUTES.TEACHER_STUDENT.path(teacherId, coursesId, item.id)
						)
					}
				>
					<td className="p-2">{item.id}</td>
					<td className="p-2">{item.name}</td>
					<td className="p-2">{item.email}</td>
					<td className="p-2">{item.status ? 'e' : 'n'}</td>
				</tr>
			)}
			pagination={
				<Pagination
					onNext={onNext}
					onPrev={onPrev}
					onLoading={onLoading}
					prev={data.prev}
					next={data.next}
					pages={data.pages}
				/>
			}
		/>
	)
}

const TableCustom = <T,>({
	data,
	columns,
	renderRows,
	pagination
}: {
	data: InfinityStudentsTableDataAdapter<T>
	columns: string[]
	renderRows: (item: T) => React.ReactNode
	pagination: React.ReactNode
}) => {
	return (
		<div className="mt-5 pt-5 pb-5 rounded-md shadow-[0_0px_0_#000,0_1px_3px_rgba(0,0,0,0.3)] overflow-hidden">
			<table className="w-full">
				<caption className="text-left p-2 text-2xl">All Students</caption>

				<thead className="text-left">
					<tr>
						{columns.map((column) => (
							<th
								key={column}
								className="font-medium p-2"
								style={{ width: `${100 / columns.length}%` }}
							>
								{column}
								<button
									className="ml-2 cursor-pointer"
									onClick={() => console.log('123')}
								>
									Sort
								</button>
							</th>
						))}
					</tr>
				</thead>
				<tbody>{data.data.map(renderRows)}</tbody>
			</table>
			{pagination}
		</div>
	)
}

const Pagination = ({
	onPrev,
	onNext,
	onLoading,
	prev,
	next,
	pages
}: {
	onPrev: () => void
	onNext: () => void
	onLoading: boolean
	prev: number | null
	next: number | null
	pages: number
}) => {
	return (
		<div className="w-full flex justify-end gap-2 p-2 items-center">
			<Button
				variant="contained"
				onClick={onPrev}
				disabled={!prev || onLoading}
			>
				{'<<'}
			</Button>
			<Button>{pages}</Button>
			<Button
				variant="contained"
				onClick={onNext}
				disabled={!next || onLoading}
			>
				{'>>'}
			</Button>
		</div>
	)
}
