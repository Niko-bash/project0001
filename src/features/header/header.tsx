import { Container } from '@mui/material'
import { Link } from 'react-router'

type MenuType = {
	key: string
	name: string
	link: string
}
//todo:Rework menu, synchronization router

const main_menu: MenuType[] = [
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

const auth_menu = [
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

export const Header = () => {
	return (
		<header className="">
			<Container>
				<div className="flex justify-between min-h-10 items-center">
					<ul className="flex gap-4 text-2xl ">
						{main_menu.map((link) => (
							<Link
								key={link.key}
								to={link.link}
							>
								{link.name}
							</Link>
						))}
					</ul>

					<ul className="flex gap-4 text-2xl">
						{auth_menu.map((link) => (
							<Link
								key={link.key}
								to={link.link}
							>
								{link.name}
							</Link>
						))}
					</ul>
				</div>
			</Container>
		</header>
	)
}
