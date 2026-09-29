import type {
	InfinityStudentsTableDataAdapter,
	StatusStudents,
	UserTableData
} from '../../api/type'
import { TableCustom } from './custom'
import { TableItem } from './item'
import { Pagination } from './pagination'

const STUDENT_COLUMNS = ['ID', 'Name', 'Email', 'Status'] as const

export const TableStudent = ({
	data,
	onPrev,
	onNext,
	teacherId,
	coursesId,
	status
	// error
}: {
	data: InfinityStudentsTableDataAdapter<UserTableData>
	onPrev: () => void
	onNext: () => void
	teacherId: string
	coursesId: string
	status: StatusStudents
	// error: Error | null
}) => {
	return (
		<TableCustom
			data={data}
			columns={STUDENT_COLUMNS}
			renderRows={(item) => (
				<TableItem
					key={item.id}
					item={item}
					teacherId={teacherId}
					coursesId={coursesId}
				/>
			)}
			pagination={
				<Pagination
					onNext={onNext}
					onPrev={onPrev}
					status={status}
					prev={data.prev}
					next={data.next}
					pages={data.pages}
				/>
			}
		/>
	)
}
