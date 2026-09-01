import { LayoutAuth, LoginForm } from '@/features/auth'
import { AuthServices } from '@/features/auth/api/auth.services'
import { Button } from '@mui/material'

export function LoginPage() {
	return (
		<LayoutAuth
			title={'Sign In'}
			form={<LoginForm AuthServices={AuthServices} />}
			buttons={[
				<Button
					key={'key-form'}
					className="w-full"
					type="submit"
					form="form"
				>
					Login
				</Button>
			]}
		/>
	)
}
