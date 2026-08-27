import type { StatusHomeWork } from '@/features/teacher/api/type'

export type StudentCoursesMode = 'Calendar' | 'Tasks' | 'Courses'

export type MapTabType = {
	Calendar: (studentId: string) => React.ReactNode
	Tasks: (studentId: string) => React.ReactNode
	Courses: () => React.ReactNode
}
export type TabType = {
	value: StudentCoursesMode
	label: Lowercase<StudentCoursesMode>
}

export type Calendar = {
	studentId: string
}

export type BoardList = {
	id: string
	status: StatusHomeWork
	title: string
}
