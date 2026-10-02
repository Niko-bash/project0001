import type { CoursesType } from '@/features/courses'
import {
	Calendar,
	Courses,
	Tasks,
	type StudentLoaderData
} from '@/features/students'
import type { StudentCoursesMode, TabType } from '@/features/students/ui/type'
import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { useLoaderData } from 'react-router'

const TABS_CONFIG: TabType[] = [
	{
		value: 'Courses',
		label: 'courses'
	},
	{
		value: 'Calendar',
		label: 'calendar'
	},
	{
		value: 'Tasks',
		label: 'tasks'
	}
]

export function StudentPage() {
	const { data: course, user: student } = useLoaderData<StudentLoaderData>()

	const [mode, setMode] = useState<StudentCoursesMode>('Courses')

	return (
		<>
			<Tabs
				value={mode}
				onChange={(_, newValue) => setMode(newValue)}
				aria-label="wrapped label tabs example"
				variant="fullWidth"
				className="pb-2"
			>
				{TABS_CONFIG.map((tab) => (
					<Tab
						value={tab.value}
						label={tab.label}
					/>
				))}
			</Tabs>
			<StudentTabContent
				mode={mode}
				studentId={student.id}
				courses={course}
			/>
		</>
	)
}

const StudentTabContent = ({
	mode,
	studentId,
	courses
}: {
	mode: StudentCoursesMode
	studentId: string
	courses: CoursesType
}) => {
	switch (mode) {
		case 'Calendar':
			return <Calendar studentId={studentId} />
		case 'Courses':
			return <Courses courses={courses} />
		case 'Tasks':
			return <Tasks studentId={studentId} />
	}
}
