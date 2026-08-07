import type { User, UserTableData } from '@/features/auth/api/type'
import type { CoursesType } from '@/features/courses/api/type'
import { TeacherServices } from '@/features/teacher/api/api'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

type TeacherLoaderData = {
	user: User
	data: CoursesType
}

export function TeacherPage() {
	const { data, user } = useLoaderData<TeacherLoaderData>()
	const [users, setUsers] = useState<UserTableData[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true)
				const users = await TeacherServices.getAllStudents(data.id)

				if (!users.success) {
					throw new Error('bad request')
				}

				setUsers(users.data)
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUsers()
	}, [data.id])

	if (isLoading) {
		return <div>Loading...</div>
	}

	return <TableStudent data={users} />
}

const TableStudent = ({ data }: { data: UserTableData[] }) => {
	return (
		<TableCustom
			data={data}
			columns={['ID', 'Name', 'Email']}
			renderRows={(item) => (
				<tr
					key={item.id}
					className="border border-gray-200 hover:bg-gray-200 hover:translate-x-6 duration-300 ease-in-out cursor-pointer"
				>
					<td className="p-2">{item.id}</td>
					<td className="p-2">{item.name}</td>
					<td className="p-2">{item.email}</td>
				</tr>
			)}
		/>
	)
}

const TableCustom = <T,>({
	data,
	columns,
	renderRows
}: {
	data: T[]
	columns: string[]
	renderRows: (item: T) => React.ReactNode
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
				<tbody>{data.map(renderRows)}</tbody>
			</table>
			<div>footer</div>
		</div>
	)
}
