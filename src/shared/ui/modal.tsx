import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@mui/material'

export const Modal = ({
	title,
	content,
	actions,
	open,
	onClose
}: {
	title?: React.ReactNode
	content?: React.ReactNode
	actions?: React.ReactNode
	open: boolean
	onClose: () => void
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="modal-dialog-title"
			aria-describedby="modal-dialog-description"
			role="dialog"
			maxWidth="sm"
			fullWidth
			disableRestoreFocus
		>
			<DialogTitle id="modal-dialog-title">{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			<DialogActions>{actions}</DialogActions>
		</Dialog>
	)
}
