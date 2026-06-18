import { RegisterForm } from '@/features/auth'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader
} from '@mui/material'

const RegisterPage = () => {
	return (
		<Box sx={{ minWidth: 600 }}>
			<Card
				variant="outlined"
				sx={{ padding: 2 }}
			>
				<CardHeader title="Sign Up" />
				<CardContent>
					<RegisterForm />
				</CardContent>
				<CardActions>
					<Button
						className="w-full"
						type="submit"
						form="form"
					>
						Lets go
					</Button>
				</CardActions>
			</Card>
		</Box>
	)
}

export default RegisterPage
