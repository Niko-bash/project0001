import type { SessionUser } from '@/features/auth/api/type'
import { ProfileForm } from '@/features/user'

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
							<ProfileForm data={preloadData} />
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
