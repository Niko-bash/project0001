import { Button } from '@mui/material'

export const AddingHomeWork = ({
	title,
	onChange
}: {
	title: React.ReactNode
	onChange: () => void
}) => {
	return (
		<Button
			onClick={onChange}
			variant="contained"
			className="w-full"
		>
			{title}
		</Button>
	)
}
