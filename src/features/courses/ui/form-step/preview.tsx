import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button } from '@mui/material'
import { type StepPreviewProps } from '../type'

export const PreviewStep = ({
	preview,
	form,
	onChangeImage
}: StepPreviewProps) => {
	return (
		<div className="flex flex-col gap-5">
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
		</div>
	)
}
