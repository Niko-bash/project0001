import { AuthServices } from '@/features/auth/api/auth.services'
import type { AuthUser } from '@/features/auth/api/type'
import { UnauthorizedError } from '@/shared/api/type'
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
const LoginPage = () => {
	const navigation = useNavigate()
	const { register, handleSubmit } = useForm<AuthUser>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<AuthUser> = async (val) => {
		try {
			const response = await AuthServices.SingIn(val)
			if (response.success) {
				navigation('/')
			}
		} catch (e: unknown) {
			if (e instanceof UnauthorizedError) {
				throw new UnauthorizedError()
			} else {
				throw new Error(String(e), { cause: e })
			}
		}
	}

	return (
		<Box sx={{ minWidth: 600 }}>
			<Card
				variant="outlined"
				sx={{ padding: 2 }}
			>
				<CardHeader title="Sign In" />
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
						Login
					</Button>
				</CardActions>
			</Card>
		</Box>
	)
}
export default LoginPage
