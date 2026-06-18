import { AccountMenu, type MenuType } from '@/shared/ui/account-menu'
import { Container } from '@mui/material'
import { Link, useRevalidator } from 'react-router'
import { AuthServices } from '../auth/api/auth.services'
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
	},
	{
		key: '3',
		name: 'MyCourses',
		link: '/mycourses'
	}
]
export const Header = () => {
	const { user, setUser } = useAuth()
	const revalidator = useRevalidator()
	const handleSignOut = async () => {
		const response = await AuthServices.logout()
		if (response) {
			setUser(null)
			revalidator.revalidate()
		}
	}

	return (
		<header className="shadow-md">
			<Container>
				<div className="flex justify-between min-h-16 items-center">
					<ul className="flex gap-9 text-2xl ">
						{MAIN_MENU &&
							MAIN_MENU.map((link) => (
								<Link
									key={link.key}
									to={link.link}
									className="leading-10 px-3 rounded-3xl delay-75 duration-150 hover:bg-green-300 hover:text-white"
								>
									{link.name}
								</Link>
							))}
					</ul>

					{user ? (
						<AccountMenu
							user={user}
							menu={ACCOUNT_MENU}
							onSignOut={handleSignOut}
						/>
					) : (
						<ul className="flex gap-7 text-2xl">
							{AUTH_MENU &&
								AUTH_MENU.map((link) => (
									<Link
										key={link.key}
										to={link.link}
										className="relative after:delay-75 after:duration-150 after:absolute after:inset-0 after:top-full after:w-full after:h-1 hover:after:bg-green-300"
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
