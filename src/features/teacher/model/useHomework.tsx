import { useEffect, useState } from 'react'
import type { CreateHomework, Homework, ITeacherServices } from '../api/type'

export const useHomework = (
	studentId: string,
	onClose: () => void,
	TeacherServices: ITeacherServices
) => {
	const [homeWork, setHomeWork] = useState<Homework[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async (val: CreateHomework) => {
		const response = await TeacherServices.createAddingHomework(
			val,
			studentId
		)
		if (response.success) {
			console.log('Suc')
			onClose()
		}
	}

	useEffect(() => {
		const fetchHomeWork = async (studentId: string) => {
			setIsLoading(true)
			try {
				const homework = await TeacherServices.getStudentHomeWork(studentId)

				if (!homework.success) {
					throw new Error('Homework students is error')
				}

				setHomeWork(homework.data)
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchHomeWork(studentId)
	}, [studentId])

	return {
		onSubmit,
		homeWork,
		isLoading
	}
}
