import { Button } from '@mui/material'
import type { MapActions, MapCards, MapCardsType, MapExtra } from '../type'
import { UnsubscribeButton } from '../unsubscribeButton'
import { CardStudent } from './student'
import { CardTeacher } from './teacher'

const MapCards: MapCards = {
	Student: (item, actions) => (
		<CardStudent
			item={item}
			actions={actions}
		/>
	),
	Teacher: (item, actions) => (
		<CardTeacher
			item={item}
			actions={actions}
		/>
	)
}

const MapActions: MapActions = {
	Student: (item, extra) => (
		<>
			<UnsubscribeButton
				title="Unsubscribe"
				coursesId={item.id}
				userId={extra.userId}
			/>
			<Button onClick={extra.handleClick}>Test My COCKE</Button>
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

	return <>{render(item, action)}</>
}
