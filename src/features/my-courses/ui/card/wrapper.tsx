import type { MapCards, MapCardsType } from '../type'
import { CardStudent } from './student'
import { CardTeacher } from './teacher'

const MapCards: MapCards = {
	Student: (item) => <CardStudent item={item} />,
	Teacher: (item) => (
		<CardTeacher
			item={item}
			action={<div>cx</div>}
		/>
	)
}

export const CardFactory = <T extends keyof MapCardsType>({
	mode,
	item
}: {
	mode: T
	item: MapCardsType[T]
}) => {
	const render = MapCards[mode]

	if (!render) {
		return null
	}

	return <>{render(item)}</>
}
