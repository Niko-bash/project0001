import { LayoutAuth, RegisterForm } from '@/features/auth'
import { AuthServices } from '@/features/auth/api/auth.services'
import { Button } from '@mui/material'

export function RegisterPage() {
	return (
		<LayoutAuth
			title={'Sign Up'}
			form={<RegisterForm AuthServices={AuthServices} />}
			buttons={[
				<Button
					key={'key-form'}
					className="w-full"
					type="submit"
					form="form"
				>
					Lets go
				</Button>
			]}
		/>
	)
}
