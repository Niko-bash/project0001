import type { UseFormReturn } from 'react-hook-form'
import type { CreateCoursesType } from '..'

export type Step = 'preview' | 'name' | 'description' | 'video'

export type StepPreviewProps = {
	form: UseFormReturn<CreateCoursesType>
	preview: string | undefined
	onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type StepNameProps = {
	form: UseFormReturn<CreateCoursesType>
}

export type StepDescriptionProps = {
	form: UseFormReturn<CreateCoursesType>
}

export type StepVideoProps = {
	videoUrl: string | undefined
	form: UseFormReturn<CreateCoursesType>
	onChangeVideo: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type StepPropsMap = {
	preview: StepPreviewProps
	name: StepNameProps
	description: StepDescriptionProps
	video: StepVideoProps
}

export type StepComponentsMap = {
	[K in Step]: (props: StepPropsMap[K]) => React.ReactNode
}

export type StepPropsMapTest = {
	[K in Step]: StepPropsMap[K]
}
