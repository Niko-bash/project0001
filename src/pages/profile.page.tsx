import type { SessionUser } from '@/features/auth/api/type'
import type { ProfileUser } from '@/features/user/api/type'
import { UserServices } from '@/features/user/api/user.sevices'
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

const compressImage = (
	file: File,
	maxWidth: number = 800,
	quality: number = 0.7
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = (e) => {
			const img = new Image()

			img.onload = () => {
				const canvas = document.createElement('canvas')
				let width = img.width
				let height = img.height

				// Пропорциональное уменьшение
				if (width > maxWidth) {
					height = (height * maxWidth) / width
					width = maxWidth
				}

				canvas.width = width
				canvas.height = height

				const ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0, width, height)

				// Конвертация в base64 сжатым JPEG
				const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
				resolve(compressedBase64)
			}

			img.onerror = reject
			img.src = e.target?.result as string
		}

		reader.onerror = reject
		reader.readAsDataURL(file)
	})
}

const ProfilePage = () => {
	const preloadData = useLoaderData<SessionUser>()

	const { handleSubmit, register, setValue } = useForm<ProfileUser>({
		mode: 'onSubmit',
		defaultValues: {
			avatar: preloadData.avatar?.replace(/^"|"$/g, '') || '',
			email: preloadData.email,
			name: preloadData.name
		}
	})

	const [preview, setPreview] = useState<string | undefined>(
		preloadData.avatar?.replace(/^"|"$/g, '') || ''
	)

	const onSubmit: SubmitHandler<ProfileUser> = async (data) => {
		const response = await UserServices.Patch(data, preloadData.id)
		if (response.success) {
			console.log('Suc')
		}
	}

	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0]

		if (image) {
			const compress = await compressImage(image, 800, 0.7)
			setPreview(compress)
			setValue('avatar', compress)
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
									src={preview || '/public/assets/hero.png'}
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
