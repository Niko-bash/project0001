import { getErrorMessage, type FallbackProps } from 'react-error-boundary'

export function MyErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div role="alert">
			<p>Error:</p>
			<pre>{getErrorMessage(error)}</pre>
			<button onClick={resetErrorBoundary}>Reload </button>
		</div>
	)
}
