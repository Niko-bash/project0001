import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'
import type { CreateCoursesType } from '..'

export const CreateCoursesForm = ({
	form,
	onChangeImage,
	onChangeVideo,
	onSubmit,
	preview,
	videoUrl
}: {
	form: UseFormReturn<CreateCoursesType>
	onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
	onChangeVideo: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSubmit: SubmitHandler<CreateCoursesType>
	preview: string | undefined
	videoUrl: string | undefined
}) => {
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
					onChange={(e) => onChangeImage(e)}
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
					onChange={(e) => onChangeVideo(e)}
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
