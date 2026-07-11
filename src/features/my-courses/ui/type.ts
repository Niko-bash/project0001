import type { CoursesType } from '@/features/courses/api/type'

export type CoursesType2 = Omit<CoursesType, 'img'>
export type MapCardsType = {
	Student: CoursesType
	Teacher: CoursesType
}

export type MapCardsKey = keyof MapCardsType
export type MapCardType = MapCardsType[keyof MapCardsType]

type RenderTypeMyCard<T extends MapCardsKey> = (
	item: MapCardsType[T],
	actions?: React.ReactNode
) => React.ReactNode

type RenderActionsMyCard<T extends MapCardsKey> = (
	item: MapCardsType[T],
	extra: MapExtra[T]
) => React.ReactNode

export type MapCards = { [key in MapCardsKey]: RenderTypeMyCard<key> }
export type MapActions = { [key in MapCardsKey]?: RenderActionsMyCard<key> }
export type MapExtra = {
	Student: {
		userId: string
		handleClick: () => void
		handleUnsubscribe: (userId: string, coursesId: string) => void
	}
	Teacher: {
		userId: string
		handleDeleted: (userId: string, coursesId: string) => void
	}
}
