import { Button } from '@mui/material'

export const Pagination = ({
	onPrev,
	onNext,
	onLoading,
	prev,
	next,
	pages
}: {
	onPrev: () => void
	onNext: () => void
	onLoading: boolean
	prev: number | null
	next: number | null
	pages: number
}) => {
	return (
		<div className="w-full flex justify-end gap-2 p-2 items-center">
			<Button
				variant="contained"
				onClick={onPrev}
				disabled={!prev || onLoading}
			>
				{'<<'}
			</Button>
			<Button>{pages}</Button>
			<Button
				variant="contained"
				onClick={onNext}
				disabled={!next || onLoading}
			>
				{'>>'}
			</Button>
		</div>
	)
}
