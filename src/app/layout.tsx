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
