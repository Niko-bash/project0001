import { Calendar, Courses, Tasks } from '@/features/students'
import type { StudentLoaderData } from '@/features/students/api/api'
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
	const loaderData: StudentLoaderData = useLoaderData()

	const [mode, setMode] = useState<StudentCoursesMode>('Courses')
	// const [isLoading, setIsLoading] = useState(false)

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
				studentId={loaderData.user.id}
			/>
		</>
	)
}

const ViewTabs = ({
	mode,
	studentId
}: {
	mode: StudentCoursesMode
	studentId: string
}) => {
	const render = MODE_COMPONENTS[mode]

	if (!render) {
		return null
	}

	return <>{render(studentId)}</>
}
