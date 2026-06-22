import { LoginForm } from '@/features/auth/ui/login-form'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader
} from '@mui/material'

export function LoginPage() {
	return (
		<Box sx={{ minWidth: 600 }}>
			<Card
				variant="outlined"
				sx={{ padding: 2 }}
			>
				<CardHeader title="Sign In" />
				<CardContent>
					<LoginForm />
				</CardContent>
				<CardActions>
					<Button
						className="w-full"
						type="submit"
						form="form"
					>
						Login
					</Button>
				</CardActions>
			</Card>
		</Box>
	)
}
