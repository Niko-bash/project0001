import { UnauthorizedError } from '@/shared/api/type'
import { TextField } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { AuthServices } from '../api/auth.services'
import type { AuthUser } from '../api/type'

export const LoginForm = () => {
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
