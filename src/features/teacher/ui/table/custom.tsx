import type { InfinityStudentsTableDataAdapter } from '../../api/type'

export const TableCustom = <T,>({
	data,
	columns,
	renderRows,
	pagination
}: {
	data: InfinityStudentsTableDataAdapter<T>
	columns: readonly string[]
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
				<tbody>{data.data.map((item) => renderRows(item))}</tbody>
			</table>
			{pagination}
		</div>
	)
}
