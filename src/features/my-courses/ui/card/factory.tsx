import { Button } from '@mui/material'
import type { MapActions, MapCards, MapCardsType, MapExtra } from '../type'
import { CardStudent } from './student'
import { CardTeacher } from './teacher'

const MapCards: MapCards = {
	Student: (item, userId, actions) => (
		<CardStudent
			item={item}
			userId={userId}
			actions={actions}
		/>
	),
	Teacher: (item, userId, actions) => (
		<CardTeacher
			item={item}
			userId={userId}
			actions={actions}
		/>
	)
}

const MapActions: MapActions = {
	Student: (item, extra) => (
		<>
			<Button onClick={() => extra.handleClickOpen(item.id)}>
				Unsubscribe
			</Button>
		</>
	),
	Teacher: (item, extra) => (
		<>
			<Button onClick={() => extra.handleClickOpen(item.id)}>Delete</Button>
		</>
	)
}

export const CardFactory = <T extends keyof MapCardsType>({
	mode,
	item,
	extra = {} as MapExtra[T]
}: {
	mode: T
	item: MapCardsType[T]
	extra?: MapExtra[T]
}) => {
	const render = MapCards[mode]
	const actions = MapActions[mode]

	const action = actions ? actions(item, extra) : null

	if (!render) {
		return null
	}

	return <>{render(item, extra.userId, action)}</>
}
