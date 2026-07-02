import type { SessionUser } from '@/features/auth/api/type'
import { useAuth } from '@/features/auth/model/use-auth'
import { Header } from '@/features/header'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import { Layout } from './layout'

let cachedScrollbarWidth: number | null = null

const getScrollbarWidth = (): number => {
	if (cachedScrollbarWidth !== null) return cachedScrollbarWidth

	const outer = document.createElement('div')
	outer.style.cssText = 'visibility:hidden;overflow:scroll;width:100px'
	document.body.appendChild(outer)

	const inner = document.createElement('div')
	inner.style.width = '100%'
	outer.appendChild(inner)

	cachedScrollbarWidth = outer.offsetWidth - inner.offsetWidth
	outer.remove()

	return cachedScrollbarWidth
}

export const App = () => {
	const data = useLoaderData<{ session: SessionUser } | null>()
	const { setUser } = useAuth()

	useEffect(() => {
		setUser(data?.session ?? null)
	}, [data?.session, setUser])

	useScrollbarCompensation()

	return (
		<Layout
			header={<Header className="pr-sb-compensate" />}
			main={
				<div className="pr-sb-compensate">
					<Container>
						<Outlet />
					</Container>
				</div>
			}
			footer={<div>footer</div>}
		/>
	)
}

const useScrollbarCompensation = () => {
	useEffect(() => {
		const scrollbarWidth = getScrollbarWidth()

		const update = () => {
			const hasScroll =
				document.documentElement.scrollHeight > window.innerHeight
			const value = hasScroll ? '0px' : `${scrollbarWidth}px`
			document.documentElement.style.setProperty('--sb-compensate', value)
		}

		update()

		const observer = new ResizeObserver(update)
		observer.observe(document.documentElement)

		return () => observer.disconnect()
	}, [])
}
