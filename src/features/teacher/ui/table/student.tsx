import type {
	InfinityStudentsTableDataAdapter,
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
					onLoading={onLoading}
					prev={data.prev}
					next={data.next}
					pages={data.pages}
				/>
			}
		/>
	)
}
