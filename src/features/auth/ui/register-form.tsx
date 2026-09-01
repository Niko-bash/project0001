import { TextField } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import type { AuthUser, IAuthServices } from '../api/type'

export const RegisterForm = ({
	AuthServices
}: {
	AuthServices: IAuthServices
}) => {
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
	)
}
