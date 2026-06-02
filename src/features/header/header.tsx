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
		link: '/courses'
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

export const Header = () => {
	return (
		<header>
			<ul>
				{main_menu.map((item) => (
					<Link
						key={item.key}
						to={item.link}
					>
						{item.name}
					</Link>
				))}
			</ul>
		</header>
	)
}
