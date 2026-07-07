import type { CoursesType } from '@/features/courses/api/type'

export type MapCardsType = {
	Student: CoursesType
	Teacher: CoursesType
}

export type MapCardsKey = keyof MapCardsType
export type MapCardType = MapCardsType[keyof MapCardsType]

type RenderTypeMyCard<T extends MapCardsKey> = (
	item: MapCardsType[T]
) => React.ReactNode

export type MapCards = { [key in MapCardsKey]: RenderTypeMyCard<key> }
