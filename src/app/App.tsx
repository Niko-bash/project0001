import { useAuth } from '@/features/auth/model/use-auth'
import { Header } from '@/features/header'
import { useLayoutEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import { Layout } from './layout'

export const App = () => {
	const data = useLoaderData()

	const { setUser } = useAuth()

	useLayoutEffect(() => {
		setUser(data.session)
	}, [data.session, setUser])

	return (
		<Layout
			header={<Header />}
			footer={<div>footer</div>}
			main={<Outlet />}
		/>
	)
}
