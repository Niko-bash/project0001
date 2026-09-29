import {
	AddingHomeWork,
	HomeworkList,
	ProfileStudent,
	TeacherCreateForm,
	useHomework,
	useModal,
	type CreateHomework,
	type TeacherStudentLoaderData
} from '@/features/teacher'
import { TeacherServices } from '@/features/teacher/api/api'

import { Modal } from '@/shared/ui/modal'
import { Button } from '@mui/material'
import { useLoaderData } from 'react-router'

export function TeacherStudentPage() {
	const teacher = useLoaderData<TeacherStudentLoaderData>()

	const { onClose, onOpen, open } = useModal()

	const { homeWork, error, status, refetch } = useHomework(
		teacher.student.id,
		TeacherServices
	)
	const onSubmit = async (val: CreateHomework) => {
		const response = await TeacherServices.createAddingHomework(
			val,
			teacher.student.id
		)
		if (response.success) {
			refetch()
			onClose()
		}
	}

	return (
		<>
			<div className="pt-10 flex flex-col gap-4">
				<ProfileStudent user={teacher.student} />
				<AddingHomeWork
					title={<>Create Homework</>}
					onChange={onOpen}
				/>
				<HomeworkList
					title={<h2>Homework List</h2>}
					items={homeWork}
					status={status}
					error={error}
				/>
			</div>
			<Modal
				open={open}
				onClose={onClose}
				title={<div>Create homework for {teacher.student.name}</div>}
				content={<TeacherCreateForm onSubmit={onSubmit} />}
				actions={
					<>
						<Button
							type="submit"
							form="form"
						>
							Create
						</Button>
						<Button onClick={onClose}>Close</Button>
					</>
				}
			/>
		</>
	)
}
