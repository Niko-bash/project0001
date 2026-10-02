import type { StatusHomeWork } from '@/features/teacher/api/type'

export type StudentCoursesMode = 'Calendar' | 'Tasks' | 'Courses'

export type CalendarType = {
	studentId: string
}
export type TasksType = {
	studentId: string
}
export type CoursesType = {
	coursesId: string
}

export type TabType = {
	value: StudentCoursesMode
	label: Lowercase<StudentCoursesMode>
}

export type BoardList = {
	id: string
	status: StatusHomeWork
	title: string
}
