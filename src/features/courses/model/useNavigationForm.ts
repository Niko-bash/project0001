import { useState } from 'react'
import type { Step } from '../ui/type'

const STEP: Step[] = ['preview', 'description', 'name', 'video']
export const useNavigationForm = () => {
	const [stepIndex, setStepIndex] = useState(0)

	const step = STEP[stepIndex]

	const handleNext = () => {
		setStepIndex((prev) => Math.min(prev + 1, STEP.length - 1))
	}

	const handlePrev = () => {
		setStepIndex((prev) => Math.max(prev - 1, 0))
	}

	const isLast = stepIndex === STEP.length - 1
	const isFirst = stepIndex === 0

	return { step, handleNext, handlePrev, isLast, isFirst }
}
