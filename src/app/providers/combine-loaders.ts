import type { LoaderFunction, LoaderFunctionArgs } from 'react-router'

export function combine<T extends LoaderFunction[]>(...loaders: T) {
	return async (args: LoaderFunctionArgs) => {
		let result: unknown = null

		for (const loader of loaders) {
			const data = await loader(args)

			if (data != null) {
				result =
					typeof data === 'object'
						? { ...(result as object), ...data }
						: data
			}
		}

		return result
	}
}
