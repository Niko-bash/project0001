import type { SessionUser } from '@/features/auth/api/type'
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router'

export type MenuType = {
	key: string
	name: string
	link: string
}

export const AccountMenu = ({
	user,
	menu
}: {
	user: SessionUser
	menu: MenuType[]
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<div>
			<IconButton
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open}
				onClick={handleClick}
			>
				<Avatar src={user.avatar}>U</Avatar>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				id="account-menu"
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{menu &&
					menu.map((link) => (
						<MenuItem key={link.key}>
							<Link
								to={link.link}
								key={link.key}
								onClick={handleClose}
							>
								{link.name}
							</Link>
						</MenuItem>
					))}
			</Menu>
		</div>
	)
}
