import { Button } from '@mui/material'

export const StepNavigation = ({
	onPrev,
	onNext,
	isLast,
	isFirst,
	isSubmitting
}: {
	onPrev: () => void
	onNext: () => void
	isLast: boolean
	isFirst: boolean
	isSubmitting: boolean
}) => {
	return (
		<div className="flex justify-between">
			{!isFirst ? (
				<Button onClick={onPrev}>Prev</Button>
			) : (
				<Button disabled={true}></Button>
			)}
			{isLast ? (
				<Button
					type="submit"
					disabled={isSubmitting}
				>
					Create Courses
				</Button>
			) : (
				<Button onClick={onNext}>Next</Button>
			)}
		</div>
	)
}
