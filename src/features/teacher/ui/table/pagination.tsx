import { Button, CircularProgress } from '@mui/material'
import type { StatusStudents } from '../../api/type'

export const Pagination = ({
	onPrev,
	onNext,
	prev,
	next,
	pages,
	status
}: {
	onPrev: () => void
	onNext: () => void
	prev: number | null
	next: number | null
	pages: number
	status: StatusStudents
}) => {
	const isLoading = status === 'loading'
	return (
		<div className="w-full flex justify-end gap-2 p-2 items-center">
			<Button
				variant="contained"
				onClick={onPrev}
				disabled={!prev || isLoading}
			>
				{'<<'}
			</Button>
			<div className="w-12 text-center">
				{isLoading ? (
					<CircularProgress
						size={30}
						color="primary"
					/>
				) : (
					pages
				)}
			</div>
			<Button
				variant="contained"
				onClick={onNext}
				disabled={!next || isLoading}
			>
				{'>>'}
			</Button>
		</div>
	)
}
