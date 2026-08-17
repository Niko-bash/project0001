import { Calendar, Courses, Tasks } from '@/features/students'
import type { StudentCoursesMode, TabType } from '@/features/students/ui/type'
import { Tab, Tabs } from '@mui/material'
import { useState, type ComponentType } from 'react'
import { useLoaderData } from 'react-router'

const MODE_COMPONENTS: Record<StudentCoursesMode, ComponentType> = {
	Courses: Courses,
	Calendar: Calendar,
	Tasks: Tasks
}

const TABS_CONFIG: TabType[] = [
	{
		value: 'Calendar',
		label: 'calendar'
	},
	{
		value: 'Courses',
		label: 'courses'
	},
	{
		value: 'Tasks',
		label: 'tasks'
	}
]

export function StudentPage() {
	const loaderData = useLoaderData()

	const [mode, setMode] = useState<StudentCoursesMode>('Calendar')
	// const [isLoading, setIsLoading] = useState(false)

	const View = MODE_COMPONENTS[mode]

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
			<View />
		</>
	)
}
