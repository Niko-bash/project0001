import { LayoutAuth } from '@/features/auth'
import { LoginForm } from '@/features/auth/ui/login-form'
import { Button } from '@mui/material'

export function LoginPage() {
	return (
		<LayoutAuth
			title={'Sign In'}
			form={<LoginForm />}
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
