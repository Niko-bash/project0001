import { Container } from '@mui/material'
import { Link } from 'react-router'

export function NotFoundPage() {
	return (
		<Container>
			<div>
				<h1>404</h1>
				<p>Page not found</p>
				<Link to="/">Go home</Link>
			</div>
		</Container>
	)
}
