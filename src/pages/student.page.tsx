import {
	Calendar,
	Courses,
	Tasks,
	type StudentLoaderData
} from '@/features/students'
import type {
	MapTabType,
	StudentCoursesMode,
	TabType
} from '@/features/students/ui/type'
import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { useLoaderData } from 'react-router'

const MODE_COMPONENTS: MapTabType = {
	Calendar: (studentId) => <Calendar studentId={studentId} />,
	Courses: Courses,
	Tasks: (studentId) => <Tasks studentId={studentId} />
}

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
	const student = useLoaderData<StudentLoaderData>()

	const [mode, setMode] = useState<StudentCoursesMode>('Courses')
	// const [isLoading, setIsLoading] = useState(true)

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
			<ViewTabs
				mode={mode}
				// onLoading={isLoading}
				studentId={student.user.id}
			/>
		</>
	)
}

const ViewTabs = ({
	mode,
	studentId
	// onLoading
}: {
	mode: StudentCoursesMode
	studentId: string
	// onLoading: boolean
}) => {
	const render = MODE_COMPONENTS[mode]

	// if (onLoading) {
	// 	;<div className="flex justify-center w-full py-4">
	// 		<CircularProgress
	// 			size={100}
	// 			color="primary"
	// 		/>
	// 	</div>
	// }

	if (!render) {
		return null
	}

	return <>{render(studentId)}</>
}
