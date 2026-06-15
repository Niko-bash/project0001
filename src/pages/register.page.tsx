import { AuthServices } from '@/features/auth/api/auth.services'
import type { AuthUser } from '@/features/auth/api/type'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	TextField
} from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'

const RegisterPage = () => {
	const navigation = useNavigate()

	const { register, handleSubmit } = useForm<AuthUser>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<AuthUser> = async (val) => {
		const response = await AuthServices.SingUp(val)
		if (response.success) {
			navigation('/')
		}
	}

	return (
		<Box sx={{ minWidth: 600 }}>
			<Card
				variant="outlined"
				sx={{ padding: 2 }}
			>
				<CardHeader title="Sign Up" />
				<CardContent>
					<form
						className="flex flex-col gap-3"
						onSubmit={handleSubmit(onSubmit)}
						id="form"
					>
						<TextField
							fullWidth
							label="email"
							{...register('email')}
						/>

						<TextField
							fullWidth
							label="password"
							{...register('password')}
						/>
					</form>
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
