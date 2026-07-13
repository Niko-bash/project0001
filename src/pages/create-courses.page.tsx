import { type CreateCoursesType } from '@/features/courses/api/type'
import { compressImage } from '@/shared/lib/compress-image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLoaderData } from 'react-router'

const DEFAULT_AVATAR = '/assets/courses.webp'

export function CreateCoursesPage() {
	const data = useLoaderData()
	const [preview, setPreview] = useState<string | undefined>(DEFAULT_AVATAR)
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)

	const form = useForm<CreateCoursesType>({
		defaultValues: {
			name: '',
			description: '',
			video: {
				description: '',
				url: undefined
			}
		}
	})

	const onSubmit: SubmitHandler<CreateCoursesType> = (values) => {
		console.log(values)
	}
	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0]
		if (image) {
			const compress = await compressImage(image, 800, 0.7)
			setPreview(compress)
			form.setValue('img', compress)
		}
	}

	const handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = e.target.files?.[0]
		console.log(video)
		if (video) {
			if (videoUrl) {
				URL.revokeObjectURL(videoUrl)
			}

			const url = URL.createObjectURL(video)
			setVideoUrl(url)
			form.setValue('video.url', url)
		}
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col pt-4 gap-4"
		>
			<img
				width={200}
				height={200}
				src={preview}
			/>
			<Button
				component="label"
				role={undefined}
				variant="outlined"
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
			>
				Upload Preview Courses
				<input
					{...form.register('img')}
					type="file"
					accept="image/**"
					hidden
					onChange={handleChangeImage}
				/>
			</Button>
			<TextField
				{...form.register('name')}
				placeholder="Name Courses"
			/>
			<TextareaAutosize
				{...form.register('description')}
				placeholder="description courses"
				minRows={3}
				style={{
					width: '100%',
					padding: '15px',
					border: '1px solid grey',
					borderRadius: '5px'
				}}
			/>
			{videoUrl ? (
				<video
					src={videoUrl}
					controls
					preload="metadata"
				/>
			) : (
				<div>Video is not loading</div>
			)}
			<Button
				component="label"
				role={undefined}
				variant="outlined"
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
			>
				Upload video
				<input
					{...form.register('video')}
					type="file"
					accept="video/**"
					hidden
					onChange={handleChangeVideo}
				/>
			</Button>
			<TextareaAutosize
				{...form.register('video.description')}
				minRows={3}
				placeholder="description video"
				style={{
					width: '100%',
					padding: '15px',
					border: '1px solid grey',
					borderRadius: '5px'
				}}
			/>
			<Button type="submit">Create Courses</Button>
		</form>
	)
}
