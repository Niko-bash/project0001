import { type ProfileUser } from '@/features/auth/api/type'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	TextField
} from '@mui/material'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLoaderData } from 'react-router'

const ProfilePage = () => {
	const data = useLoaderData()
	const [preview, setPreview] = useState<string | undefined>(undefined)

	const { handleSubmit, register, setValue } = useForm<ProfileUser>({
		mode: 'onSubmit',
		defaultValues: {
			avatar: undefined,
			email: data.email,
			name: data.name
		}
	})

	const onSubmit: SubmitHandler<ProfileUser> = async (data) => {
		console.log(data)
	}

	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0]

		if (image) {
			const reader = new FileReader()
			setPreview(preview)

			reader.onload = () => {
				const base64 = reader.result as string

				setPreview(base64)
				setValue('avatar', base64)
			}

			reader.readAsDataURL(image)
		}
	}

	return (
		<section>
			<Container>
				<div className="pt-10">
					<Card variant="outlined">
						<CardHeader title="Profile" />
						<CardContent>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col gap-4"
								id="profile-form"
							>
								<img
									width={200}
									height={200}
									src={preview ?? '/public/assets/hero.png'}
								/>

								<Button
									component="label"
									role={undefined}
									variant="outlined"
									tabIndex={-1}
									startIcon={<CloudUploadIcon />}
								>
									Upload files
									<input
										{...register('avatar')}
										type="file"
										accept="image/**"
										hidden
										onChange={handleChangeImage}
									/>
								</Button>
								<TextField
									fullWidth
									label="email"
									{...register('email')}
								/>
								<TextField
									fullWidth
									label="name"
									{...register('name')}
								/>
							</form>
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

export default ProfilePage
