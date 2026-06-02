import { Header } from '@/features/header'
import { Outlet } from 'react-router'
import { Layout } from './layout'

export const App = () => {
	return (
		<Layout
			header={<Header />}
			footer={<div>footer</div>}
			main={<Outlet />}
		/>
	)
}
