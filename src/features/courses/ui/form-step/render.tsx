import type { UseFormReturn } from 'react-hook-form'
import type { CreateCoursesType } from '../..'
import type { Step, StepComponentsMap, StepPropsMapTest } from '../type'
import { DescriptionStep } from './description'
import { NameStep } from './name'
import { PreviewStep } from './preview'
import { VideoStep } from './video'

const MAP_STEP_COMPONENTS: StepComponentsMap = {
	preview: PreviewStep,
	description: DescriptionStep,
	name: NameStep,
	video: VideoStep
}
export const RenderForm = <T extends Step>({
	step,
	form,
	onChangeImage,
	onChangeVideo,
	preview,
	videoUrl
}: {
	step: T
	form: UseFormReturn<CreateCoursesType>
	onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
	onChangeVideo: (e: React.ChangeEvent<HTMLInputElement>) => void
	preview: string | undefined
	videoUrl: string | undefined
}) => {
	const render = MAP_STEP_COMPONENTS[step]

	const stepProps: StepPropsMapTest = {
		preview: { form, preview, onChangeImage },
		name: { form },
		description: { form },
		video: { form, videoUrl, onChangeVideo }
	}

	return <>{render(stepProps[step])}</>
}
