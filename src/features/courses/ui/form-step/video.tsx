import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, TextareaAutosize } from '@mui/material'
import { type StepVideoProps } from '../type'

export const VideoStep = ({
	videoUrl,
	form,
	onChangeVideo
}: StepVideoProps) => {
	return (
		<div className="flex flex-col gap-5">
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
		</div>
	)
}
