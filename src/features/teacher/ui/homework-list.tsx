import { CircularProgress } from '@mui/material'
import type { Homework, HomeworkStatus } from '../api/type'
import { HomeWorkItem } from './homework-item'

export const HomeworkList = ({
	title,
	items,
	status,
	error
}: {
	title: React.ReactNode
	items: Homework[]
	status: HomeworkStatus
	error: Error | null
}) => {
	const hasData = items.length > 0
	const isError = status === 'error'
	const isEmpty = status === 'success' && !hasData
	const isLoading = status === 'loading'

	return (
		<div>
			{title}

			{isLoading && (
				<div className="flex justify-center w-full py-4">
					<CircularProgress
						size={100}
						color="primary"
					/>
				</div>
			)}

			{isError && <div>{error?.message ?? 'Fail to loading Data'}</div>}

			{isEmpty && <div>Sorry, list is empty =(</div>}

			{hasData && (
				<ol className="flex flex-col gap-4">
					{items &&
						items.map((quest) => (
							<HomeWorkItem
								item={quest}
								key={quest.id}
							/>
						))}
				</ol>
			)}
		</div>
	)
}
