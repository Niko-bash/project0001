import type { CoursesType, CoursesType2 } from '@/features/courses'

export const TABS_MODS = {
	Student: 'Student',
	Teacher: 'Teacher',
	set: 'set'
} as const

export type Mode = keyof MapCardsType

export type TabsMode = {
	id: number
	value: Mode
	label: Mode
}

// export type CoursesType2 = Omit<CoursesType, 'img'>

export type MapCardsType = {
	Student: CoursesType
	Teacher: CoursesType2
}

export type MapTest = {
	[K in Mode]: MapCardsType[K]
}
