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
import { useFormik } from 'formik'
import { useNavigate } from 'react-router'

const RegisterPage = () => {
	const navigation = useNavigate()
	const { handleChange, handleSubmit, values } = useFormik<AuthUser>({
		initialValues: { email: '', password: '' },
		onSubmit: async (values) => {
			const response = await AuthServices.SingUp(values)
			if (response.success) {
				console.log('321')
				navigation('/')
			}
		}
	})

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
						onSubmit={handleSubmit}
						id="form"
					>
						<TextField
							fullWidth
							label="email"
							name="email"
							value={values.email}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							label="password"
							name="password"
							value={values.password}
							onChange={handleChange}
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
