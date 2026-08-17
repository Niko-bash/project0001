export type StudentCoursesMode = 'Calendar' | 'Tasks' | 'Courses'
export type TabType = {
	value: StudentCoursesMode
	label: Lowercase<StudentCoursesMode>
}
