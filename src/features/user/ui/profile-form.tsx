import type { SessionUser } from '@/features/auth/api/type'
import { compressImage } from '@/shared/lib/compress-image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { ProfileUser } from '../api/type'
import { UserServices } from '../api/user.sevices'

export const ProfileForm = ({ data }: { data: SessionUser }) => {
	const form = useForm<ProfileUser>({
		mode: 'onSubmit',
		defaultValues: {
			avatar: data.avatar?.replace(/^"|"$/g, '') || '',
			email: data.email,
			name: data.name
		}
	})
	const [preview, setPreview] = useState<string | undefined>(
		data.avatar?.replace(/^"|"$/g, '') || ''
	)

	const onSubmit: SubmitHandler<ProfileUser> = async (val) => {
		const response = await UserServices.updateUserProfile(val, data.id)
		if (response.success) {
			console.log('Suc')
		}
	}

	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0]

		if (image) {
			const compress = await compressImage(image, 800, 0.7)
			setPreview(compress)
			form.setValue('avatar', compress)
		}
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
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
					{...form.register('avatar')}
					type="file"
					accept="image/**"
					hidden
					onChange={handleChangeImage}
				/>
			</Button>
			<TextField
				fullWidth
				label="email"
				{...form.register('email')}
			/>
			<TextField
				fullWidth
				label="name"
				{...form.register('name')}
			/>
		</form>
	)
}
