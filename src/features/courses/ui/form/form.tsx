import type { UseFormReturn } from 'react-hook-form'
import type { CreateCoursesType } from '../..'
import type { Step } from '../type'
import { DescriptionStep } from './description'
import { NameStep } from './name'
import { PreviewStep } from './preview'
import { VideoStep } from './video'

export const FromStep = ({
	step,
	form,
	onChangeImage,
	onChangeVideo,
	preview,
	videoUrl
}: {
	step: Step
	form: UseFormReturn<CreateCoursesType>
	onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
	onChangeVideo: (e: React.ChangeEvent<HTMLInputElement>) => void
	preview: string | undefined
	videoUrl: string | undefined
}) => {
	switch (step) {
		case 'name':
			return <NameStep form={form} />
		case 'description':
			return <DescriptionStep form={form} />
		case 'preview':
			return (
				<PreviewStep
					form={form}
					onChangeImage={onChangeImage}
					preview={preview}
				/>
			)
		case 'video':
			return (
				<VideoStep
					form={form}
					onChangeVideo={onChangeVideo}
					videoUrl={videoUrl}
				/>
			)
		default: {
			const _exhaustive: never = step
			return _exhaustive
		}
	}
}
