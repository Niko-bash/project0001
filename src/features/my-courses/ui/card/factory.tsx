import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material'
import type { MapActions, MapCards, MapCardsType, MapExtra } from '../type'
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
			<Button onClick={extra.handleClickOpen}>Unsubscribe</Button>
			<Dialog
				open={extra.open}
				onClose={extra.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				role="alertdialog"
			>
				<DialogTitle id="alert-dialog-title">
					You really unsubscribe this courses ???
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Warning !!! If you unsubscribe this courses your money will be
						lost
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={extra.handleClose}
						autoFocus
					>
						Disagree
					</Button>
					<Button
						onClick={() => {
							extra.handleUnsubscribe(extra.userId, item.id)
							extra.handleClose()
						}}
					>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</>
	),
	Teacher: (item, extra) => (
		<>
			<Button onClick={extra.handleClickOpen}>Delete</Button>
			<Dialog
				open={extra.open}
				onClose={extra.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				role="alertdialog"
			>
				<DialogTitle id="alert-dialog-title">
					You really want to delete this courses ??? All your student lost
					this courses and them money
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Warning !!! If you delete this courses, all your students lost
						them money
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={extra.handleClose}
						autoFocus
					>
						Disagree
					</Button>
					<Button
						onClick={() => {
							extra.handleDeleted(extra.userId, item.id)
							extra.handleClose()
						}}
					>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
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
