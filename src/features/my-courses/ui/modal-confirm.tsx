import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material'

const TITLE = {
	Student: 'You really unsubscribe this courses ???',
	Teacher:
		'You really want to delete this courses ??? All your student lost this courses and them money'
}

const CONTENT = {
	Student:
		'Warning !!! If you delete this courses, all your students lost them money',
	Teacher:
		'Warning !!! If you unsubscribe this courses your money will be lost'
}

export const ModalConfirm = ({
	mode,
	open,
	onClose,
	onConfirmDelete
}: {
	mode: 'Teacher' | 'Student'
	open: boolean
	onClose: () => void
	onConfirmDelete: () => void
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			role="alertdialog"
		>
			<DialogTitle id="alert-dialog-title">{TITLE[mode]}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{CONTENT[mode]}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={onClose}
					autoFocus
				>
					Disagree
				</Button>
				<Button onClick={onConfirmDelete}>Agree</Button>
			</DialogActions>
		</Dialog>
	)
}
