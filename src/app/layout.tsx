import { Outlet } from 'react-router'

export const Layout = ({
	header,
	footer,
	main
}: {
	header?: React.ReactNode
	footer?: React.ReactNode
	main?: React.ReactNode
}) => {
	return (
		<div className="flex flex-col min-h-screen">
			{header}
			<main className="flex-1">{main}</main>
			{footer}
		</div>
	)
}

export const AuthLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex flex-1 m-auto justify-center items-center">
				<Outlet />
			</main>
		</div>
	)
}
