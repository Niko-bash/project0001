import type { CoursesType } from '@/features/courses/api/type'

export const TABS_MODS = {
	Student: 'Student',
	Teacher: 'Teacher',
	set: 'set'
} as const

export type TabsMode = {
	id: number
	value: Mode
	label: Mode
}

export type CoursesType2 = Omit<CoursesType, 'img'>
export type MapCardsType = {
	Student: CoursesType
	Teacher: CoursesType
}

export type Mode = keyof MapCardsType
export type MapCardType = MapCardsType[keyof MapCardsType]

type RenderTypeMyCard<T extends Mode> = (
	item: MapCardsType[T],
	userId: string,
	actions?: React.ReactNode
) => React.ReactNode

type RenderActionsMyCard<T extends Mode> = (
	item: MapCardsType[T],
	extra: MapExtra[T]
) => React.ReactNode

export type MapCards = { [key in Mode]: RenderTypeMyCard<key> }
export type MapActions = { [key in Mode]?: RenderActionsMyCard<key> }
export type MapExtra = {
	Student: {
		userId: string
		open: boolean
		handleClickOpen: (id: string) => void
	}
	Teacher: {
		userId: string
		open: boolean
		handleClickOpen: (id: string) => void
	}
}
