import { AccountMenu, type MenuType } from '@/shared/ui/account-menu'
import { Container } from '@mui/material'
import { Link } from 'react-router'
import { useAuth } from '../auth/model/use-auth'

//todo:Rework menu, synchronization router

const MAIN_MENU: MenuType[] = [
	{
		key: '1',
		name: 'Courses',
		link: '/'
	},
	{
		key: '2',
		name: 'About',
		link: '/about'
	},
	{
		key: '3',
		name: 'News',
		link: '/news'
	}
]

const AUTH_MENU: MenuType[] = [
	{
		key: '1',
		name: 'Sign In',
		link: '/auth/login'
	},
	{
		key: '2',
		name: 'Sign Up',
		link: '/auth/register'
	}
]

const ACCOUNT_MENU: MenuType[] = [
	{
		key: '1',
		name: 'Profile',
		link: '/profile'
	},
	{
		key: '2',
		name: 'Settings',
		link: '/settings'
	}
]
export const Header = () => {
	const { user } = useAuth()
	return (
		<header className="">
			<Container>
				<div className="flex justify-between min-h-10 items-center">
					<ul className="flex gap-4 text-2xl ">
						{MAIN_MENU &&
							MAIN_MENU.map((link) => (
								<Link
									key={link.key}
									to={link.link}
								>
									{link.name}
								</Link>
							))}
					</ul>

					{user ? (
						<AccountMenu
							user={user}
							menu={ACCOUNT_MENU}
						/>
					) : (
						<ul className="flex gap-4 text-2xl">
							{AUTH_MENU &&
								AUTH_MENU.map((link) => (
									<Link
										key={link.key}
										to={link.link}
									>
										{link.name}
									</Link>
								))}
						</ul>
					)}
				</div>
			</Container>
		</header>
	)
}
