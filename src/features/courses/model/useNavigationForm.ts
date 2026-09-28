import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateCoursesType } from '..'
import type { StepType } from '../ui/type'

const STEP: StepType[] = [
	{ id: '0', step: 'preview', fields: ['img'] },
	{ id: '1', step: 'name', fields: ['name'] },
	{ id: '2', step: 'description', fields: ['description'] },
	{ id: '3', step: 'video', fields: ['video.url', 'video.description'] }
]

export const useNavigationForm = (form: UseFormReturn<CreateCoursesType>) => {
	const [stepIndex, setStepIndex] = useState(0)

	const step = STEP[stepIndex]

	const handleNext = async () => {
		const isValid = await form.trigger(step.fields, { shouldFocus: true })

		if (!isValid) {
			return
		}

		setStepIndex((prev) => Math.min(prev + 1, STEP.length - 1))
	}

	const handlePrev = () => {
		setStepIndex((prev) => Math.max(prev - 1, 0))
	}

	const isLast = stepIndex === STEP.length - 1
	const isFirst = stepIndex === 0

	return { step: step.step, handleNext, handlePrev, isLast, isFirst }
}
