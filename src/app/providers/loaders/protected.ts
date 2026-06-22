import { AuthServices } from '@/features/auth/api/auth.services'
import { redirect } from 'react-router'

interface ProtectedLoaderParams {
	params: {
		id?: string
	}
	request: Request
}

export async function protectedLoader({
	params,
	request
}: ProtectedLoaderParams) {
	const user = await AuthServices.getSession()

	if (!user) {
		return redirect('/')
	}

	if (user.id !== params.id) {
		const url = new URL(request.url)
		const pathname = url.pathname
		return redirect(pathname.replace(params.id!, user.id))
	}

	return user
}
