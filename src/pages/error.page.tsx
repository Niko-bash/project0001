import { Container } from '@mui/material'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export function ErrorPage() {
	const error = useRouteError()

	console.error('Route Error:', error)

	return (
		<Container>
			<div className="error-page">
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>
						{isRouteErrorResponse(error)
							? `${error.status} ${error.statusText}`
							: error instanceof Error
								? error.message
								: 'Unknown Error'}
					</i>
				</p>
				<Link to="/">Go Home</Link>
			</div>
		</Container>
	)
}
