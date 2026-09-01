import { useState } from 'react'

export const useModal = () => {
	const [selectedId, setSelectedId] = useState<{ id: string } | null>(null)
	const [open, setOpen] = useState(false)
	const handleClickOpen = (coursesId: string) => {
		setSelectedId({ id: coursesId })
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setSelectedId(null)
	}

	return { open, handleClickOpen, handleClose, selectedId }
}
