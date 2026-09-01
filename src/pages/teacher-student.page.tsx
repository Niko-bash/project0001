import {
	AddingHomeWork,
	HomeworkList,
	ProfileStudent,
	TeacherCreateForm
} from '@/features/teacher'
import { type TeacherStudentLoaderData } from '@/features/teacher/api/type'
import { useHomework } from '@/features/teacher/model/useHomework'
import { useModal } from '@/features/teacher/model/useModal'

import { Modal } from '@/shared/ui/modal'
import { Button } from '@mui/material'
import { useLoaderData } from 'react-router'

export function TeacherStudentPage() {
	const loaderData: TeacherStudentLoaderData = useLoaderData()

	const { handleClose, handleOpen, open } = useModal()

	const { homeWork, isLoading, onSubmit } = useHomework(
		loaderData.student.id,
		handleClose
	)

	return (
		<>
			<div className="pt-10 flex flex-col gap-4">
				<ProfileStudent user={loaderData.student} />
				<AddingHomeWork
					title={'Create Homework'}
					onChange={handleOpen}
				/>
				<HomeworkList
					title={'Homework List'}
					items={homeWork}
				/>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				title={<div>Create homework for {loaderData.student.name}</div>}
				content={<TeacherCreateForm onSubmit={onSubmit} />}
				actions={
					<>
						<Button
							type="submit"
							form="form"
						>
							Create
						</Button>
						<Button onClick={handleClose}>Close</Button>
					</>
				}
			/>
		</>
	)
}
