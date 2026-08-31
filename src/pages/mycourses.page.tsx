import type { SessionUser } from '@/features/auth/api/type'
import {
	CreateCourses,
	MyCoursesList,
	MyCoursesModalTitle,
	MyCoursesModelContent,
	useCourses,
	useCoursesDeletion,
	useModal
} from '@/features/my-courses'

import { CardFactory } from '@/features/my-courses/ui/card/factory'
import {
	TABS_MODS,
	type Mode,
	type TabsMode
} from '@/features/my-courses/ui/type'
import { Modal } from '@/shared/ui/modal'
import { Button, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { useLoaderData } from 'react-router'

const TABS_MODE: TabsMode[] = [
	{
		id: 1,
		value: TABS_MODS.Student,
		label: TABS_MODS.Student
	},
	{
		id: 2,
		value: TABS_MODS.Teacher,
		label: TABS_MODS.Teacher
	}
]

export function MyCoursesPage() {
	const data = useLoaderData<SessionUser>()

	const [mode, setMode] = useState<Mode>('Student')

	const { courses, isLoading, refetch } = useCourses(data.id, mode)
	const { open, handleClickOpen, handleClose, selectedId } = useModal()
	const { deleted } = useCoursesDeletion(data.id, mode)

	const handleDelete = async () => {
		if (!selectedId) return

		const response = await deleted(selectedId.id)

		if (response) {
			handleClose()
			await refetch()
		}
	}

	return (
		<>
			<Tabs
				value={mode}
				onChange={(_, val) => setMode(val)}
				aria-label="wrapped label tabs example"
				variant="fullWidth"
				className="pb-2"
			>
				{TABS_MODE.map((tab) => (
					<Tab
						value={tab.value}
						label={tab.label}
						disabled={isLoading}
					/>
				))}
			</Tabs>
			<CreateCourses title={'Create Courses'} />
			<MyCoursesList
				isLoading={isLoading}
				items={courses}
				render={(item) => (
					<CardFactory
						key={item.id}
						item={item}
						mode={mode}
						extra={{
							userId: data.id,
							open,
							handleClickOpen
						}}
					/>
				)}
			/>

			<Modal
				open={open}
				onClose={handleClose}
				title={<MyCoursesModalTitle mode={mode} />}
				content={<MyCoursesModelContent mode={mode} />}
				actions={
					<>
						<Button
							onClick={handleClose}
							autoFocus
						>
							Disagree
						</Button>
						<Button onClick={handleDelete}>Agree</Button>
					</>
				}
			/>
		</>
	)
}
