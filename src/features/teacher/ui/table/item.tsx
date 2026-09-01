import { ROUTES } from '@/shared/lib/router-config'
import { useNavigate } from 'react-router'
import type { UserTableData } from '../../api/type'

export const TableItem = ({
	item,
	teacherId,
	coursesId
}: {
	item: UserTableData
	teacherId: string
	coursesId: string
}) => {
	const navigate = useNavigate()
	return (
		<tr
			key={item.id}
			className="border border-gray-200 hover:bg-gray-200 hover:translate-x-6 duration-300 ease-in-out cursor-pointer"
			onClick={() =>
				navigate(ROUTES.TEACHER_STUDENT.path(teacherId, coursesId, item.id))
			}
		>
			<td className="p-2">{item.id}</td>
			<td className="p-2">{item.name}</td>
			<td className="p-2">{item.email}</td>
			<td className="p-2">{item.status ? 'e' : 'n'}</td>
		</tr>
	)
}
