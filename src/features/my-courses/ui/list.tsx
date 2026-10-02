import type { CoursesType, CoursesType2 } from '@/features/courses'
import { CircularProgress } from '@mui/material'
import type { myCorsesStatus } from '../api/type'

export const MyCoursesList = ({
	items,
	render,
	status,
	error
}: {
	items: CoursesType[] | CoursesType2[]
	render: (item: CoursesType | CoursesType2) => React.ReactNode
	status: myCorsesStatus
	error: Error | null
}) => {
	const hasData = items.length > 0
	const isLoading = status === 'loading'
	const isError = status === 'error'
	const isEmpty = status === 'success' && !hasData

	return (
		<div>
			{isLoading && (
				<div className="flex justify-center w-full py-4">
					<CircularProgress
						size={100}
						color="primary"
					/>
				</div>
			)}

			{isError && <div>{error?.message ?? 'failed'}</div>}

			{isEmpty && <div>Sorry list is empty =((</div>}

			{hasData && (
				<ul className="flex flex-col gap-5 mt-10">
					{items.map((item) => render(item))}
				</ul>
			)}
		</div>
	)
}
