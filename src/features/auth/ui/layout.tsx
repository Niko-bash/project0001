import { Box, Card, CardActions, CardContent, CardHeader } from '@mui/material'

export const LayoutAuth = ({
	title,
	form,
	buttons
}: {
	title: React.ReactNode
	form: React.ReactNode
	buttons: React.ReactNode[]
}) => {
	return (
		<Box sx={{ minWidth: 600 }}>
			<Card
				variant="outlined"
				sx={{ padding: 2 }}
			>
				<CardHeader title={title} />
				<CardContent>{form}</CardContent>
				<CardActions>{buttons}</CardActions>
			</Card>
		</Box>
	)
}
