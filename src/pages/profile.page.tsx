import type { SessionUser } from '@/features/auth'
import { ProfileForm } from '@/features/user'
import { UserServices } from '@/features/user/api/user.services'

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container
} from '@mui/material'
import { useLoaderData } from 'react-router'

export function ProfilePage() {
	const preloadData = useLoaderData<SessionUser>()

	return (
		<section>
			<Container>
				<div className="pt-10">
					<Card variant="outlined">
						<CardHeader title="Profile" />
						<CardContent>
							<ProfileForm
								data={preloadData}
								UserServices={UserServices}
							/>
						</CardContent>
						<CardActions className="m-2">
							<Button
								type="submit"
								form="profile-form"
								variant="outlined"
								className="w-full"
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</div>
			</Container>
		</section>
	)
}
