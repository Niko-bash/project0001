import { LayoutAuth, LoginForm } from '@/features/auth'
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
