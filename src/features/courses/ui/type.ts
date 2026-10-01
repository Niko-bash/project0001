import type { FieldPath, UseFormReturn } from 'react-hook-form'
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

export type StepType = {
	id: string
	step: Step
	fields: FieldPath<CreateCoursesType>[]
}
