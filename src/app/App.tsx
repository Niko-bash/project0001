import type { SessionUser } from '@/features/auth/api/type'
import { useAuth } from '@/features/auth/model/use-auth'
import { Header } from '@/features/header'
import { useLayoutEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import { Layout } from './layout'

export const App = () => {
	const data: { session: SessionUser } | null = useLoaderData()
	const { setUser } = useAuth()

	useLayoutEffect(() => {
		setUser(data?.session ?? null)
	}, [data?.session, setUser])

	return (
		<Layout
			header={<Header />}
			footer={<div>footer</div>}
			main={<Outlet />}
		/>
	)
}
