import { LayoutAuth, RegisterForm } from '@/features/auth'
import { Button } from '@mui/material'

export function RegisterPage() {
	return (
		<LayoutAuth
			title={'Sign Up'}
			form={<RegisterForm />}
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
