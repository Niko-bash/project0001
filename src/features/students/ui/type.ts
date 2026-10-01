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

// export type MapPropsType = {
// 	Calendar: CalendarType
// 	Tasks: TasksType
// 	Courses: CoursesType
// }

// export type MapComponentsType = {
// 	[key in StudentCoursesMode]: (props: MapPropsType[key]) => React.ReactNode
// }

// export type MapSlotPropsType = {
// 	[key in StudentCoursesMode]: MapPropsType[key]
// }

export type TabType = {
	value: StudentCoursesMode
	label: Lowercase<StudentCoursesMode>
}

export type BoardList = {
	id: string
	status: StatusHomeWork
	title: string
}
