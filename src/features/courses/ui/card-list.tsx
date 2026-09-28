import { CircularProgress } from '@mui/material'
import type { CoursesStatus, CoursesType } from '../api/type'
import { useIntersectionSentinel } from '../model/useIntersectionSentinel'
import { type InfinityCoursesType } from './card'

export const CoursesList = ({
	courses,
	render,
	error,
	status,
	onLoadMore,
	onRetry,
	hasData
}: {
	courses: InfinityCoursesType
	render: (item: CoursesType) => React.ReactNode
	error: Error | null
	status: CoursesStatus
	onLoadMore: () => void
	onRetry: () => void
	hasData: boolean
}) => {
	const isInitialLoading = status === 'loading'
	const isLoadingMore = status === 'loadingMore'
	const isEmpty = status === 'success' && !hasData
	const isErrorEmpty = status === 'error'
	// const isErrorMore = status === 'errorMore'
	const canLoadMore = status === 'success' && courses.next !== null && hasData

	const sentinelRef = useIntersectionSentinel(onLoadMore, canLoadMore)
	return (
		<div className="relative">
			{isInitialLoading && (
				<div className="flex justify-center w-full py-4">
					<CircularProgress
						size={100}
						color="primary"
					/>
				</div>
			)}

			{isErrorEmpty && (
				<div
					role="alert"
					className="py-4 text-center"
				>
					<p>{error?.message ?? 'Not loaded data'}</p>
					<button onClick={onRetry}>Retry</button>
				</div>
			)}

			{isEmpty && (
				<div className="py-4 text-center"> List empty, sorry =(</div>
			)}

			{hasData && (
				<ul className="flex flex-wrap gap-4 justify-between">
					{courses.data.map((course) => render(course))}
				</ul>
			)}

			{isLoadingMore && (
				<div className="flex justify-center w-full py-4">
					<CircularProgress
						size={40}
						color="primary"
					/>
				</div>
			)}

			{canLoadMore && <div ref={sentinelRef} />}
		</div>
	)
}
