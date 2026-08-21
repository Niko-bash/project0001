export type StudentCoursesMode = 'Calendar' | 'Tasks' | 'Courses'

export type MapTabType = {
	Calendar: (studentId: string) => React.ReactNode
	Tasks: () => React.ReactNode
	Courses: () => React.ReactNode
}
export type TabType = {
	value: StudentCoursesMode
	label: Lowercase<StudentCoursesMode>
}

export type Calendar = {
	studentId: string
}
