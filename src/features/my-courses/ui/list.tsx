import type { CoursesType } from '@/features/courses/api/type'
import { CircularProgress } from '@mui/material'
import type { myCorsesStatus } from '../api/type'

export const MyCoursesList = ({
	items,
	render,
	status
}: {
	items: CoursesType[] | undefined
	render: (item: CoursesType) => React.ReactNode
	status: myCorsesStatus
}) => {
	const isLoading = status === 'loading'
	if (isLoading) {
		return (
			<div className="flex justify-center w-full py-4">
				<CircularProgress
					size={100}
					color="primary"
				/>
			</div>
		)
	}
	return (
		<ul className="flex flex-col gap-5 mt-10">
			{items && items.length > 0 ? (
				items.map((item) => render(item))
			) : (
				<div>Sorry, you not adding courses</div>
			)}
		</ul>
	)
}
